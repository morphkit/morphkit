// Export types
export type { Config, ComponentMeta, ProjectType, StylingLib } from './types/index.js';

// Export schemas
export { ConfigSchema, ComponentMetaSchema } from './types/index.js';

// Export errors
export {
  WarpUIError,
  ConfigNotFoundError,
  ConfigExistsError,
  ComponentNotFoundError,
  RepositoryAccessError,
  ComponentTypeMismatchError,
  InvalidPathError
} from './utils/errors.js';

// Export utilities (for testing)
export { configExists, readConfig, writeConfig } from './utils/config.js';
export { validatePath, validateComponentName } from './utils/validation.js';
