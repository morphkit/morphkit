import { WarpUIError } from "./errors.js";

export function getGitHubToken(): string | null {
  // Check environment variables in priority order
  return process.env.GITHUB_TOKEN || process.env.GH_TOKEN || null;
}

export function validateGitHubToken(token: string): boolean {
  // Basic validation - token should be 40+ chars for classic PAT
  // or start with ghp_ for fine-grained PAT or github_pat_ for fine-grained PAT
  return (
    token.length >= 40 ||
    token.startsWith("ghp_") ||
    token.startsWith("github_pat_")
  );
}

export class GitHubAuthError extends WarpUIError {
  constructor() {
    super(
      "GitHub authentication required. Please set GITHUB_TOKEN environment variable with a valid Personal Access Token.\n\nTo create a token:\n1. Go to https://github.com/settings/tokens\n2. Generate a new token (classic) with `repo` scope\n3. Set environment variable: export GITHUB_TOKEN=your_token_here",
      "GITHUB_AUTH_REQUIRED",
      1,
    );
  }
}
