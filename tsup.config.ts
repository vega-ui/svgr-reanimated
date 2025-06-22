import { defineConfig } from 'tsup'

const OUTPUT_DIR = 'build'

export default defineConfig({
  name: 'reanimated-lucide',
  entry: ['src/index.ts'],
  clean: true,
  bundle: true,
  splitting: false,
  outDir: OUTPUT_DIR,
  dts: true,
  format: 'esm',
  external: [
    '@babel/types',
    '@babel/traverse',
    '@babel/core'
  ]
})