import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";

import { ThemeProvider as StyledThemeProvider } from "styled-components";

import EoscrTheme from '../src/themes/eoscr-theme';

const StylesDecorator = storyFn => (
  <StylesProvider injectFirst>
    <CssBaseline />
    <StyledThemeProvider theme={EoscrTheme}>
        <MuiThemeProvider theme={EoscrTheme}>
          {storyFn()}
        </MuiThemeProvider>
      </StyledThemeProvider>
  </StylesProvider>
);

export default StylesDecorator;