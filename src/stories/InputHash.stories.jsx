import React from 'react'

import InputHash from '../lib/InputHash'

export default {
  title: 'Example/Input Hash',
  component: InputHash
}

const Template = (args) => <InputHash {...args} />

export const Example = Template.bind({})
Example.args = {
  handleOnChange: () => {},
  messageError: 'Incorrect hash',
  messageSuccess: 'Hash is correct',
  useHashValidator: false,
  label: '',
  variant: 'filled'
}
