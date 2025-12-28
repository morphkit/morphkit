import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    cli: 'src/bin/cli.ts'
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  shims: true,
  splitting: false,
  sourcemap: false,
  minify: false,
  outDir: 'dist',
  outExtension: ({ format }) => ({
    js: format === 'esm' ? '.mjs' : '.cjs'
  })
});
