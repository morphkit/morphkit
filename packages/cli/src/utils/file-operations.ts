import { access, mkdir, rm, rename, readdir } from "fs/promises";
import { join, resolve } from "path";
import { tmpdir } from "os";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import * as tar from "tar";
import { getGitHubToken, GitHubAuthError } from "./github-auth.js";

export interface CopyOptions {
  withTests?: boolean;
  dryRun?: boolean;
}

export async function componentExists(
  basePath: string,
  name: string,
): Promise<boolean> {
  try {
    const absoluteBasePath = resolve(process.cwd(), basePath);
    await access(join(absoluteBasePath, name));
    return true;
  } catch {
    return false;
  }
}

export async function flowExists(
  basePath: string,
  flowType: string,
  variant: string,
): Promise<boolean> {
  try {
    const absoluteBasePath = resolve(process.cwd(), basePath);
    await access(join(absoluteBasePath, flowType, variant));
    return true;
  } catch {
    return false;
  }
}

export async function createDirectory(path: string): Promise<void> {
  const absolutePath = resolve(process.cwd(), path);

  try {
    await mkdir(absolutePath, { recursive: true });
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code !== "EEXIST") {
      throw error;
    }
  }
}

async function downloadAndExtractTarball(
  tempDir: string,
  filterFn: (path: string) => boolean,
  stripCount: number,
): Promise<void> {
  const token = getGitHubToken();
  if (!token) {
    throw new GitHubAuthError();
  }

  const apiUrl = `https://api.github.com/repos/morphkit/morphkit/tarball/main`;

  const headers: HeadersInit = {
    Authorization: `token ${token}`,
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "@morphkit/cli",
  };

  const response = await fetch(apiUrl, { headers });

  if (response.status === 401 || response.status === 403) {
    throw new GitHubAuthError();
  }

  if (!response.ok) {
    throw new Error(
      `Failed to download: ${response.status} ${response.statusText}`,
    );
  }

  if (!response.body) {
    throw new Error("Response body is null");
  }

  const tarballPath = join(tempDir, "repo.tar.gz");
  const fileStream = createWriteStream(tarballPath);

  // @ts-expect-error - Node.js stream types compatibility
  await pipeline(response.body, fileStream);

  await tar.extract({
    file: tarballPath,
    cwd: tempDir,
    filter: filterFn,
    strip: stripCount,
  });
}

const COMPONENT_FILES_TO_COPY = [".tsx", ".theme.ts", "/index.ts", ".ts"];

const COMPONENT_TEST_FILES = [".test.tsx", ".test.ts"];

const COMPONENT_FILES_TO_SKIP = ["README.mdx", "meta.json", "/examples/"];

function shouldCopyComponentFile(
  filename: string,
  withTests: boolean,
): boolean {
  if (COMPONENT_FILES_TO_SKIP.some((skip) => filename.includes(skip))) {
    return false;
  }

  if (COMPONENT_TEST_FILES.some((ext) => filename.endsWith(ext))) {
    return withTests;
  }

  return COMPONENT_FILES_TO_COPY.some(
    (ext) => filename.endsWith(ext) || filename.includes(ext),
  );
}

export async function copyComponent(
  name: string,
  destPath: string,
  _type: string,
  options: CopyOptions = {},
): Promise<string[]> {
  const { withTests = false, dryRun = false } = options;

  const absoluteDestPath = resolve(process.cwd(), destPath);
  const tempDir = join(tmpdir(), `morphkit-${Date.now()}`);
  await mkdir(tempDir, { recursive: true });

  try {
    await downloadAndExtractTarball(
      tempDir,
      (path: string) => {
        if (!path.includes(`packages/react-native/src/${name}/`)) {
          return false;
        }
        const filename = path.split(`packages/react-native/src/${name}/`)[1];
        if (!filename) return true;
        return shouldCopyComponentFile(filename, withTests);
      },
      4,
    );

    const extractedPath = join(tempDir, name);
    const finalPath = join(absoluteDestPath, name);

    const copiedFiles: string[] = [];

    if (dryRun) {
      try {
        const files = await readdir(extractedPath, { recursive: true });
        for (const file of files) {
          copiedFiles.push(join(name, file.toString()));
        }
      } catch {
        copiedFiles.push(name);
      }
    } else {
      await mkdir(absoluteDestPath, { recursive: true });
      await rm(finalPath, { recursive: true, force: true });
      await rename(extractedPath, finalPath);

      try {
        const files = await readdir(finalPath, { recursive: true });
        for (const file of files) {
          copiedFiles.push(join(name, file.toString()));
        }
      } catch {
        copiedFiles.push(name);
      }
    }

    return copiedFiles;
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

const FLOW_FILES_TO_SKIP = ["meta.json"];

function shouldCopyFlowFile(filename: string): boolean {
  return !FLOW_FILES_TO_SKIP.some((skip) => filename.includes(skip));
}

export async function copyFlow(
  flowType: string,
  variant: string,
  destPath: string,
  options: CopyOptions = {},
): Promise<string[]> {
  const { dryRun = false } = options;

  const absoluteDestPath = resolve(process.cwd(), destPath);
  const tempDir = join(tmpdir(), `morphkit-flow-${Date.now()}`);
  await mkdir(tempDir, { recursive: true });

  const flowPath = variant === "default" ? `(${variant})` : variant;
  const sourcePath = `packages/react-native-flows/src/${flowType}/${flowPath}/`;

  try {
    await downloadAndExtractTarball(
      tempDir,
      (path: string) => {
        if (!path.includes(sourcePath)) {
          return false;
        }
        const filename = path.split(sourcePath)[1];
        if (!filename) return true;
        return shouldCopyFlowFile(filename);
      },
      5,
    );

    const extractedPath = join(tempDir, flowPath);
    const finalPath = join(absoluteDestPath, flowType, variant);

    const copiedFiles: string[] = [];

    if (dryRun) {
      try {
        const files = await readdir(extractedPath, { recursive: true });
        for (const file of files) {
          copiedFiles.push(join(flowType, variant, file.toString()));
        }
      } catch {
        copiedFiles.push(join(flowType, variant));
      }
    } else {
      await mkdir(join(absoluteDestPath, flowType), { recursive: true });
      await rm(finalPath, { recursive: true, force: true });
      await rename(extractedPath, finalPath);

      try {
        const files = await readdir(finalPath, { recursive: true });
        for (const file of files) {
          copiedFiles.push(join(flowType, variant, file.toString()));
        }
      } catch {
        copiedFiles.push(join(flowType, variant));
      }
    }

    return copiedFiles;
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}
