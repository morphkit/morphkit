// Export types
export type {
  Config,
  ComponentMeta,
  ProjectType,
  StylingLib,
} from "./types/index.js";

// Export schemas
export { ConfigSchema, ComponentMetaSchema } from "./types/index.js";

// Export errors
export {
  WarpUIError,
  ConfigNotFoundError,
  ConfigExistsError,
  ComponentNotFoundError,
  ComponentTypeMismatchError,
  InvalidPathError,
} from "./utils/errors.js";

export { GitHubAuthError } from "./utils/github-auth.js";

// Export utilities (for testing)
export { configExists, readConfig, writeConfig } from "./utils/config.js";
export { validatePath, validateComponentName } from "./utils/validation.js";
