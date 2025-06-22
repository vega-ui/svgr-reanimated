import { defineConfig } from 'tsup'
import { dependencies, devDependencies } from './package.json';

const OUTPUT_DIR = 'build'

export default defineConfig({
  name: 'reanimated-lucide',
  entry: ['src/index.ts'],
  clean: true,
  splitting: false,
  outDir: OUTPUT_DIR,
  dts: true,
  format: 'esm',
  external: Object.keys(dependencies).concat(Object.keys(devDependencies)),
})