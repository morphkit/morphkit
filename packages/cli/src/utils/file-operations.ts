import { access, mkdir, rm, rename } from "fs/promises";
import { join, resolve } from "path";
import { tmpdir } from "os";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import * as tar from "tar";
import { getGitHubToken, GitHubAuthError } from "./github-auth.js";

export async function componentExists(
  basePath: string,
  name: string,
): Promise<boolean> {
  try {
    // Resolve relative paths to absolute based on current working directory
    const absoluteBasePath = resolve(process.cwd(), basePath);
    await access(join(absoluteBasePath, name));
    return true;
  } catch {
    return false;
  }
}

export async function createDirectory(path: string): Promise<void> {
  // Resolve relative paths to absolute based on current working directory
  const absolutePath = resolve(process.cwd(), path);

  try {
    await mkdir(absolutePath, { recursive: true });
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code !== "EEXIST") {
      throw error;
    }
  }
}

export async function copyComponent(
  name: string,
  destPath: string,
  _type: string,
): Promise<void> {
  // Get GitHub token for authentication
  const token = getGitHubToken();
  if (!token) {
    throw new GitHubAuthError();
  }

  // Resolve relative paths to absolute based on current working directory
  const absoluteDestPath = resolve(process.cwd(), destPath);

  // GitHub API endpoint to get tarball
  const apiUrl = `https://api.github.com/repos/morphkit/morphkit/tarball/main`;

  const headers: HeadersInit = {
    Authorization: `token ${token}`,
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "@morphkit/cli",
  };

  try {
    // Download tarball
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

    // Create temp directory for extraction
    const tempDir = join(tmpdir(), `warp-ui-${Date.now()}`);
    await mkdir(tempDir, { recursive: true });

    // Save tarball to temp file
    const tarballPath = join(tempDir, "repo.tar.gz");
    const fileStream = createWriteStream(tarballPath);

    // @ts-expect-error - Node.js stream types compatibility
    await pipeline(response.body, fileStream);

    // Extract only the component directory
    await tar.extract({
      file: tarballPath,
      cwd: tempDir,
      filter: (path: string) => {
        // GitHub tarballs have format: owner-repo-commit/path/to/file
        // We want: packages/nativewind/src/${name}/
        return path.includes(`packages/nativewind/src/${name}/`);
      },
      strip: 4, // Strip owner-repo-commit/packages/nativewind/src/
    });

    // Move extracted component to destination
    const extractedPath = join(tempDir, name);
    const finalPath = join(absoluteDestPath, name);

    // Ensure destination exists
    await mkdir(absoluteDestPath, { recursive: true });

    // Move component
    await rename(extractedPath, finalPath);

    // Clean up temp directory
    await rm(tempDir, { recursive: true, force: true });
  } catch (error) {
    if (error instanceof GitHubAuthError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new Error(`Failed to pull component: ${error.message}`);
    }
    throw error;
  }
}
