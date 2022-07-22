import React from 'react'

import RicardianContract from '../lib/RicardianContract'
import config from '../lib/config'

export default {
  title: 'Example/Ricardian Contract',
  component: RicardianContract
}

const Template = (args) => <RicardianContract {...args} />

export const Example = Template.bind({})
Example.args = {
  httpEndpoint: config.eosApiHost,
  contractName: 'eosio',
  actionName: undefined,
  showClauses: true,
  url: config.eosApiHost,
  title: undefined,
  showActionsAtBottom: false
}
