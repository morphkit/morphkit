# @warp-ui/react-native

Internal React Native component library.

## Installation

### Prerequisites
- GitHub account with contributor access to `jaksm/warp-ui`
- GitHub Personal Access Token with `read:packages` scope

### Setup

1. Configure npm to use GitHub Packages:
   ```bash
   npm config set @warp-ui:registry https://npm.pkg.github.com
   ```

2. Authenticate with GitHub:
   ```bash
   npm login --scope=@warp-ui --auth-type=legacy --registry=https://npm.pkg.github.com
   # Username: your-github-username
   # Password: your-github-personal-access-token
   # Email: your-email
   ```

3. Install package:
   ```bash
   npm install @warp-ui/react-native
   ```

## Usage

```typescript
import { Typography } from "@warp-ui/react-native";

<Typography>Hello World</Typography>
```

## Available Components

- **Typography** - Text component with custom styling

## Notes

- No build process needed - Expo/Metro bundler handles TypeScript transpilation
- Tree-shaking handled automatically by bundler
