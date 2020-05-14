import { createMuiTheme } from '@material-ui/core/styles'

const EOSCR_THEME = {
  palette: {
    primary: {
      main: '#212121',
      light: '#757575',
      contrastText: 'rgba(255, 255, 255, 1)',
      800: '#424242',
      700: '#616161',
      600: '#757575',
      500: '#9E9E9E',
      400: '#BDBDBD',
      300: '#E0E0E0',
      200: '#EEEEEE',
      100: '#F5F5F5',
      50: '#FAFAFA',
      onPrimaryHighEmphasizedText: 'rgba(255, 255, 255, 1)',
      onPrimaryMediumEmphasizedText: 'rgba(255, 255, 255, 0.6)',
      onPrimaryDisabledText: 'rgba(255, 255, 255, 0.38)',
      highEmphasizedBlackText: 'rgba(0, 0, 0, 0.87)',
      mediumEmphasizedBlackText: 'rgba(0, 0, 0, 0.6)',
      disabledBlackText: 'rgba(0, 0, 0, 0.38)'
    },
    secondary: {
      main: '#3EBBD3',
      light: '#5ECFE2',
      dark: '#39ABC0',
      contrastText: 'rgba(0, 0, 0, 0.87)',
      900: '#265F63',
      800: '#2F828E',
      700: '#3496A6',
      600: '#39ABC0',
      500: '#3EBBD3',
      400: '#47C5DA',
      300: '#5ECFE2',
      200: '#88DDEB',
      100: '#B6EBF3',
      50: '#E1F7FA',
      onSecondaryHighEmphasizedText: 'rgba(0, 0, 0, 0.87)',
      onSecondaryMediumEmphasizedText: 'rgba(0, 0, 0, 0.6)',
      onSecondaryDisabledText: 'rgba(0, 0, 0, 0.38)',
      highEmphasizedWhiteText: 'rgba(255, 255, 255, 1)',
      mediumEmphasizedWhiteText: 'rgba(255, 255, 255, 0.6)',
      disabledWhiteText: 'rgba(255, 255, 255, 0.38)'
    }
  },
  typography: {
    fontFamily: ["'PT Sans', sans-serif;", "'Open Sans', sans-serif;"].join(
      ','
    ),
    h1: {
      size: '101.4 px',
      letterSpacing: '-1.5px',
      fontWeight: 'normal',
      fontFamily: '"PT Sans", sans-serif;',
      lineHeight: 'normal'
    },
    h2: {
      fontSize: '63.4px',
      letterSpacing: '-0.5px',
      fontWeight: 'normal',
      fontFamily: "'PT Sans', sans-serif;",
      lineHeight: 'normal'
    },
    h3: {
      fontSize: '50.7px',
      letterSpacing: 'normal',
      fontWeight: 'normal',
      fontFamily: "'PT Sans', sans-serif;",
      lineHeight: 'normal'
    },
    h4: {
      fontSize: '35.9px',
      letterSpacing: '0.25px',
      fontWeight: 'normal',
      fontFamily: "'PT Sans', sans-serif;",
      lineHeight: 'normal'
    },
    h5: {
      fontSize: '25.4px',
      letterSpacing: 'normal',
      fontWeight: 'normal',
      fontFamily: "'PT Sans', sans-serif;",
      lineHeight: 'normal'
    },
    h6: {
      fontSize: '21.1px',
      letterSpacing: '0.25px',
      fontWeight: 'bold',
      fontFamily: "'PT Sans', sans-serif;",
      lineHeight: 'normal'
    },
    body1: {
      fontSize: '15.8px',
      letterSpacing: '0.5px',
      fontWeight: 'normal',
      fontFamily: '"Open Sans", sans-serif;',
      lineHeight: '1.77'
    },
    body2: {
      fontSize: '13.8px',
      letterSpacing: '0.25px',
      fontWeight: 'normal',
      fontFamily: '"Open Sans", sans-serif;',
      lineHeight: '1.45'
    },
    subtitle1: {
      fontSize: '15.8px',
      letterSpacing: '0.15px',
      fontWeight: 'normal',
      fontFamily: '"Open Sans", sans-serif;',
      lineHeight: '1.52'
    },
    subtitle2: {
      fontSize: '13.7px',
      letterSpacing: '0.1px',
      fontWeight: 600,
      fontFamily: '"Open Sans", sans-serif;',
      lineHeight: '1.75'
    },
    button: {
      fontSize: '14.8px',
      letterSpacing: '1.25px',
      fontWeight: 'normal',
      fontFamily: "'PT Sans', sans-serif;",
      lineHeight: '1.08'
    },
    caption: {
      fontSize: '11.8px',
      letterSpacing: '0.4px',
      fontWeight: 'normal',
      fontFamily: '"Open Sans", sans-serif;',
      lineHeight: '1.35'
    },
    overline: {
      fontSize: '12.7px',
      letterSpacing: '2px',
      fontWeight: 'normal',
      fontFamily: '"Open Sans", sans-serif;',
      lineHeight: '1.26'
    }
  }
}

export default createMuiTheme(EOSCR_THEME)
