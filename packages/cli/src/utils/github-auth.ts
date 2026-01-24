import { MorphkitError, ExitCode } from "./errors.js";

export function getGitHubToken(): string | null {
  return process.env.GITHUB_TOKEN || process.env.GH_TOKEN || null;
}

export function validateGitHubToken(token: string): boolean {
  return (
    token.length >= 40 ||
    token.startsWith("ghp_") ||
    token.startsWith("github_pat_")
  );
}

export class GitHubAuthError extends MorphkitError {
  constructor() {
    super(
      "GitHub authentication required. Please set GITHUB_TOKEN environment variable with a valid Personal Access Token.\n\nTo create a token:\n1. Go to https://github.com/settings/tokens\n2. Generate a new token (classic) with `repo` scope\n3. Set environment variable: export GITHUB_TOKEN=your_token_here",
      "GITHUB_AUTH_REQUIRED",
      ExitCode.AuthRequired,
    );
  }
}
