import { ThemeProvider } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles'
import { addDecorator } from '@storybook/react'
import { withThemes } from '@react-theming/storybook-addon'
import { EOSCR_THEME } from '@eoscostarica/eoscr-theme'

const providerFn = ({ theme, children }) => {
  const muTheme = createTheme(theme)

  return <ThemeProvider theme={muTheme}>{children}</ThemeProvider>
}

// pass ThemeProvider and array of your themes to decorator
addDecorator(withThemes(null, [EOSCR_THEME], { providerFn }))
