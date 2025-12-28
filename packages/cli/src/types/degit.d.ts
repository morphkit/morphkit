declare module "degit" {
  interface DegitOptions {
    cache?: boolean;
    force?: boolean;
    verbose?: boolean;
    mode?: "tar" | "git";
  }

  interface DegitEmitter {
    clone(dest: string): Promise<void>;
    on(event: string, callback: (...args: unknown[]) => void): void;
  }

  function degit(source: string, options?: DegitOptions): DegitEmitter;

  export = degit;
}
