import { join } from "path";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import * as tar from "tar";

const JSDELIVR_CDN = "https://cdn.jsdelivr.net/npm";
const NPM_REGISTRY = "https://registry.npmjs.org";

export interface NpmPackageMetadata {
  name: string;
  version: string;
  dist: {
    tarball: string;
    shasum: string;
  };
}

export async function fetchPackageFile<T>(
  packageName: string,
  filePath: string,
): Promise<T> {
  const url = `${JSDELIVR_CDN}/${packageName}@latest/${filePath}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${filePath} from ${packageName}: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}

export async function fetchPackageMetadata(
  packageName: string,
): Promise<NpmPackageMetadata> {
  const url = `${NPM_REGISTRY}/${packageName}/latest`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch package metadata for ${packageName}: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<NpmPackageMetadata>;
}

export async function downloadAndExtractPackage(
  packageName: string,
  tempDir: string,
  filterFn: (path: string) => boolean,
): Promise<void> {
  const metadata = await fetchPackageMetadata(packageName);
  const tarballUrl = metadata.dist.tarball;

  const response = await fetch(tarballUrl);

  if (!response.ok) {
    throw new Error(
      `Failed to download tarball for ${packageName}: ${response.status} ${response.statusText}`,
    );
  }

  if (!response.body) {
    throw new Error("Response body is null");
  }

  const tarballPath = join(tempDir, "package.tar.gz");
  const fileStream = createWriteStream(tarballPath);

  // @ts-expect-error - Node.js stream types compatibility
  await pipeline(response.body, fileStream);

  await tar.extract({
    file: tarballPath,
    cwd: tempDir,
    filter: (path: string) => {
      const normalizedPath = path.replace(/^package\//, "");
      return filterFn(normalizedPath);
    },
    strip: 1,
  });
}
