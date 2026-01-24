export function detectNonInteractiveMode(): boolean {
  if (!process.stdin.isTTY) {
    return true;
  }

  if (process.env.CI === "true" || process.env.CI === "1") {
    return true;
  }

  if (process.env.TERM === "dumb") {
    return true;
  }

  return false;
}

export function isInteractive(yesFlag?: boolean): boolean {
  if (yesFlag) {
    return false;
  }

  return !detectNonInteractiveMode();
}
