import { access, mkdir } from 'fs/promises';
import { join, resolve } from 'path';
import degit from 'degit';
import { RepositoryAccessError } from './errors.js';

export async function componentExists(basePath: string, name: string): Promise<boolean> {
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
    if (error instanceof Error && 'code' in error && error.code !== 'EEXIST') {
      throw error;
    }
  }
}

export async function copyComponent(
  name: string,
  destPath: string,
  _type: string,
  _lib: string
): Promise<void> {
  const repoPath = `warp-ui/warp-ui/packages/react-native/src/${name}`;

  // Resolve relative paths to absolute based on current working directory
  const absoluteDestPath = resolve(process.cwd(), destPath);

  const emitter = degit(repoPath, {
    cache: false,
    force: true,
    mode: 'tar'
  });

  try {
    await emitter.clone(join(absoluteDestPath, name));
  } catch (error) {
    if (error instanceof Error && (error.message.includes('404') || error.message.includes('403'))) {
      throw new RepositoryAccessError();
    }
    throw error;
  }
}
