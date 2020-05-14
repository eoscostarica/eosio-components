import { addParameters, addDecorator } from '@storybook/react'
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks'

import StylesDecorator from './styles-decorator';

addDecorator(StylesDecorator)

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage
  }
})
