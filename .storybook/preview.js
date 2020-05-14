import { addParameters, addDecorator } from '@storybook/react'
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import StylesDecorator from './styles-decorator';

addDecorator(StylesDecorator)

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'desktop',
  },
})
