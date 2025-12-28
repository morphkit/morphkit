export class WarpUIError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly exitCode: number = 1
  ) {
    super(message);
    this.name = 'WarpUIError';
  }
}

export class ConfigNotFoundError extends WarpUIError {
  constructor() {
    super(
      'warp-ui.json not found. Run `warp-ui init` first.',
      'CONFIG_NOT_FOUND',
      1
    );
  }
}

export class ConfigExistsError extends WarpUIError {
  constructor() {
    super(
      'warp-ui.json already exists. Delete it to reinitialize.',
      'CONFIG_EXISTS',
      1
    );
  }
}

export class ComponentNotFoundError extends WarpUIError {
  constructor(componentName: string) {
    super(
      `Component "${componentName}" not found in registry.`,
      'COMPONENT_NOT_FOUND',
      1
    );
  }
}

export class ComponentTypeMismatchError extends WarpUIError {
  constructor(expected: string, actual: string) {
    super(
      `Component type mismatch. Expected ${expected}, got ${actual}.`,
      'TYPE_MISMATCH',
      1
    );
  }
}

export class InvalidPathError extends WarpUIError {
  constructor(path: string) {
    super(
      `Invalid path: ${path}. Use absolute paths starting with /.`,
      'INVALID_PATH',
      1
    );
  }
}
