export enum ExitCode {
  Success = 0,
  GeneralError = 1,
  ConfigNotFound = 2,
  ConfigExists = 3,
  ItemNotFound = 4,
  AuthRequired = 5,
  ValidationError = 6,
}

export class MorphkitError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly exitCode: ExitCode = ExitCode.GeneralError,
  ) {
    super(message);
    this.name = "MorphkitError";
  }
}

export class ConfigNotFoundError extends MorphkitError {
  constructor() {
    super(
      "morphkit.config.mjs not found. Run `morphkit init` first.",
      "CONFIG_NOT_FOUND",
      ExitCode.ConfigNotFound,
    );
  }
}

export class ConfigExistsError extends MorphkitError {
  constructor() {
    super(
      "morphkit.config.mjs already exists. Use --overwrite to reinitialize.",
      "CONFIG_EXISTS",
      ExitCode.ConfigExists,
    );
  }
}

export class ComponentNotFoundError extends MorphkitError {
  constructor(componentName: string) {
    super(
      `Component "${componentName}" not found in registry.`,
      "COMPONENT_NOT_FOUND",
      ExitCode.ItemNotFound,
    );
  }
}

export class FlowNotFoundError extends MorphkitError {
  constructor(flowName: string) {
    super(
      `Flow "${flowName}" not found in registry.`,
      "FLOW_NOT_FOUND",
      ExitCode.ItemNotFound,
    );
  }
}

export class ComponentTypeMismatchError extends MorphkitError {
  constructor(expected: string, actual: string) {
    super(
      `Component type mismatch. Expected ${expected}, got ${actual}.`,
      "TYPE_MISMATCH",
      ExitCode.ValidationError,
    );
  }
}

export class InvalidPathError extends MorphkitError {
  constructor(path: string) {
    super(
      `Invalid path: ${path}. Use absolute paths starting with /.`,
      "INVALID_PATH",
      ExitCode.ValidationError,
    );
  }
}

export class ValidationError extends MorphkitError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR", ExitCode.ValidationError);
  }
}

export class TokenMergeError extends MorphkitError {
  constructor(configPath: string, reason: string) {
    super(
      `Failed to merge tokens into ${configPath}: ${reason}. Update manually or contact support.`,
      "TOKEN_MERGE_FAILED",
      ExitCode.GeneralError,
    );
  }
}
