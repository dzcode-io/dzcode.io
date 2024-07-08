import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { readFileSync } from 'fs';

let bundleInfo: { version: string } = {
  version: `v${require('./package.json').version as string}`, // eslint-disable-line @typescript-eslint/no-var-requires
};
try {
  bundleInfo = JSON.parse(
    readFileSync('.bundle-info.json').toString(),
  ) as typeof bundleInfo;
} catch (error) {
  console.log(`no .bundle-info.json found`);
}

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    alias: {
      src: './src',
    },
    define: {
      'window.bundleInfo': bundleInfo,
    },
  },
  html: {
    template: './src/main.html',
  },
});
