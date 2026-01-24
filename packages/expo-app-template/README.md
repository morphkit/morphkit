# Expo Supabase Starter

A complete Expo starter template with authentication powered by Supabase.

## Features

- **Supabase Authentication** - Email/password auth with session persistence
- **Expo Router** - File-based routing with route protection
- **NativeWind** - Tailwind CSS for React Native
- **React Hook Form + Zod** - Form validation
- **TypeScript** - Type safety
- **ESLint & Prettier** - Code formatting

## Project Structure

- `src/app/(auth)` - Authentication screens (login, register)
- `src/app/(app)` - Protected screens (home)
- `src/components` - Reusable components (Button, AppText)
- `src/contexts` - Auth context with Supabase integration
- `src/lib` - Supabase client configuration
- `src/utils` - Utility functions

## Getting Started

### 1. Clone and Install

```sh
git clone <your-repo-url> my-app
cd my-app
yarn install
```

### 2. Set up Supabase

1. Create a new project at [https://supabase.com](https://supabase.com)
2. Copy your project URL and anon key from Settings > API
3. Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_SUPABASE_URL=your-project-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Create a database in a Supabase Project

1. Go to the SQL Editor page in the Dashboard.
2. Click User Management Starter under the Community > Quickstarts tab.
3. Click Run.

### 4. Link the app

```sh
supabase link --project-ref <project-id> --debug
# You can get <project-id> from your project's dashboard URL: https://supabase.com/dashboard/project/<project-id>
supabase db pull --debug
```

### 5. Run the app

```sh
yarn start
```

## Development

### Available Scripts

- `yarn start` - Start the Expo development server

OR/THEN

- `yarn android` - Run on Android device/emulator
- `yarn ios` - Run on iOS device/simulator
- `yarn web` - Run in web browser
- `yarn lint` - Run ESLint
- `yarn typecheck` - Run TypeScript type checking
- `yarn check` - Run both linting and type checking

### Code Quality

This project uses ESLint and TypeScript for code quality:

```sh
# Run linting only
yarn lint

# Run type checking only
yarn typecheck

# Run both (recommended before committing)
yarn check
```

## Authentication Flow

The app uses Supabase Auth with:

- Secure session storage (SecureStore on native, localStorage on web)
- Automatic session refresh
- Route protection (guests → login, authenticated → home)
- Email/password authentication

## Customization

- Update form validation schemas in the auth screens
- Modify the design in component files
- Add more protected routes in `src/app/(app)`
- Extend user metadata in Supabase dashboard

## Todo

- [x] Add ToS and Privacy Policy
- [ ] Assume user is logged in Expo (EAS) and Supabase accounts and have both MCPs installed. Add tasks to README.md in order to just ask the user for the app name and create both Expo and Supabase projects and connect them to current project
- [ ] Implement Login as dev to Expo account + EAS automatic deployment
- [ ] Implement Social login
- [ ] Implement OTP Login
- [ ] Implement EXPO Payments
- [ ] Implement User plan info in DB
- [ ] Implement init script (instead of following instructions)
- [ ] Implement seamless Supabase MCP integration + EXPO Login + GitHub setup (basically `fork => prompt LLM to create a new project => add project info to .env => run init script`)
- [ ] Setup Supabase project essetials? (master/staging etc. investigate more)
- [ ] Do security audit after all
- [ ] Implement ideation plan:
  - [ ] Configure database and endpoints based on Supabase architecture
  - [ ] Configure back-office
  - [ ] Implement brand guidelines
- [ ] Talk with Claude in order to make this list better?
