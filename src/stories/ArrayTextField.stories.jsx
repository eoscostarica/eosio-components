import React from 'react'

import ArrayTextField from '../components/ArrayTextField'

export default {
  title: 'Example/Array Text Field',
  component: ArrayTextField
}

const Template = (args) => <ArrayTextField {...args} />

export const Example = Template.bind({})
Example.args = {
  variant: 'outlined',
  label: 'Text Field',
  value: [],
  onChange: () => {},
  className: '',
  ChipProps: {}
}
