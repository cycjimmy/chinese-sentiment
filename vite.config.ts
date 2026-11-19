import { builtinModules } from 'node:module'

import { defineConfig } from 'vite'

// `nodejieba` is a native CommonJS addon: bundling it would break the binding
// lookup, so it stays an external import resolved by the consumer's Node.
const external = [
  ...builtinModules,
  ...builtinModules.map(name => `node:${name}`),
  'nodejieba',
]

export default defineConfig({
  build: {
    target: 'node22',
    outDir: 'dist',
    // `npm run build` empties dist first; keeping the flag off lets a single
    // `build:esm` run preserve `dist/dictionary` and the emitted types.
    emptyOutDir: false,
    minify: false,
    sourcemap: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      // `dist/index.js` stays in sync with `main`, `module` and `exports`.
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external,
    },
  },
})
