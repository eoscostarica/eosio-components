import React from 'react'

import RicardianContract from '../components/RicardianContract'
import config from '../config'

export default {
  title: 'Example/Ricardian Contract',
  component: RicardianContract
}

const Template = (args) => <RicardianContract {...args} />

export const Example = Template.bind({})
Example.args = {
  httpEndpoint: config.eosApiHost,
  contractName: 'notarioeoscr',
  actionName: undefined,
  showClauses: true,
  url: config.eosApiHost,
  title: undefined,
  showActionsAtBottom: false
}
