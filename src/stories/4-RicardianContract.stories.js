import React from 'react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import RicardianContract from '../components/RicardianContract'

export default {
  title: 'RicardianContract',
  component: RicardianContract,
  decorators: [withKnobs]
}

export const ricardianContract = () => {
  const httpEndpoint = text('httpEndpoint', 'https://jungle2.eosio.cr')
  const contractName = text('contractName', 'notarioeoscr')
  const actionName = text('actionName', undefined)
  const showClauses = boolean('showClauses', true)

  return (
    <RicardianContract
      httpEndpoint={httpEndpoint}
      contractName={contractName}
      actionName={actionName}
      showClauses={showClauses}
      url='https://jungle2.bloks.io'
    />
  )
}
