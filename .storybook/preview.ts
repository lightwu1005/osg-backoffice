import type { Preview } from "@storybook/react";
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/material-icons';
import {withThemeByDataAttribute, withThemeFromJSXProvider} from "@storybook/addon-themes";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID
} from '@mui/material/styles';
import {materialTheme} from "../src/app/theme";

export const decorators = [
    withThemeFromJSXProvider({
      themes: {
        [MATERIAL_THEME_ID]: materialTheme
      },
      defaultTheme: 'light',
      Provider: MaterialCssVarsProvider,
      GlobalStyles: CssBaseline,
    }),
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-mui-color-scheme',
    }),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true, // Adds the description and default columns
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    }
  },
  decorators
};

const preview: Preview = {
  parameters,
};

export default preview;
