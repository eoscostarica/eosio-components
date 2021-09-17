import React from 'react'

import BPJsonForm from '../lib/BPJsonGenerator'

export default {
  title: 'Example/Block Producer JSON Generator',
  component: BPJsonForm
}

const Template = (args) => <BPJsonForm {...args} />

export const Example = Template.bind({})
Example.args = {
  accountName: 'eoscostarica',
  bpJson: null,
  onSubmit: () => {}
}
