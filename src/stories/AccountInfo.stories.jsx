import React from 'react'

import AccountInfo from '../lib/AccountInfo'

export default {
  title: 'Example/Account Information',
  component: AccountInfo
}

const Template = (args) => <AccountInfo {...args} />

export const Example = Template.bind({})
