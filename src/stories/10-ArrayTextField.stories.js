import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withKnobs, text } from '@storybook/addon-knobs'

import ArrayTextField from '../components/ArrayTextField'

export default {
  title: 'ArrayTextField',
  component: ArrayTextField,
  decorators: [withKnobs]
}

export const BasicArrayTextFieldd = () => {
  const variant = text('variant', '')

  return (
    <Grid item xs={12}>
      <ArrayTextField variant={variant || 'outlined'} label="Todo list" />
    </Grid>
  )
}
