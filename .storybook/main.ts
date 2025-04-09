import type { StorybookConfig } from "@storybook/nextjs";
import path from 'path';

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    'storybook-addon-mock'
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // Speeds up Storybook build time
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: true,
      },
      // Makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // Makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true,
      // Filter out third-party props from node_modules except @mui packages
      propFilter: (prop) =>
          prop.parent ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName) : true,
    },
  },
  staticDirs: [path.resolve(__dirname, '../public')],
  webpackFinal: async (config) => {
    // make sure the config.resolve and config.resolve.alias are defined.
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};

    // setting the alias "@"
    (config.resolve.alias as any)['@'] = path.resolve(__dirname, '../src');

    return config;
  },
};
export default config;
