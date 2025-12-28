import { InvalidPathError } from "./errors.js";

export function validatePath(path: string): boolean {
  // Accept both relative and absolute paths
  // Just ensure it's not empty and doesn't contain invalid characters
  if (!path || path.trim().length === 0) {
    throw new InvalidPathError("Path cannot be empty");
  }

  // Check for invalid characters (very basic validation)
  if (path.includes("\0")) {
    throw new InvalidPathError("Path contains invalid characters");
  }

  return true;
}

export function validateComponentName(name: string): boolean {
  // Check if component name is valid (alphanumeric, hyphens, underscores)
  const pattern = /^[a-z0-9_-]+$/;
  if (!pattern.test(name)) {
    throw new Error(
      `Invalid component name: ${name}. Use lowercase letters, numbers, hyphens, and underscores only.`,
    );
  }
  return true;
}
