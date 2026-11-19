import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // The package only runs in Node, and nodejieba resolves a native binding.
    environment: 'node',
    include: ['__test__/**/*.test.ts'],
  },
})
