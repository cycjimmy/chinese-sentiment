import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  typescript: true,
  ignores: [
    'dist/**',
    '.release/**',
    // Generated from tasks/dictionary by `npm run dict:handle`.
    'src/dictionary/**',
    'docs/**',
    'package-lock.json',
  ],
})
