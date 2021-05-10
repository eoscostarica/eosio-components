import React from 'react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import RicardianContract from '../components/RicardianContract'
import config from '../config'

export default {
  title: 'RicardianContract',
  component: RicardianContract,
  decorators: [withKnobs]
}

export const ricardianContract = () => {
  const httpEndpoint = text('httpEndpoint', config.eosApiHost)
  const contractName = text('contractName', 'notarioeoscr')
  const actionName = text('actionName', undefined)
  const showClauses = boolean('showClauses', true)
  const title = text('title', undefined)

  return (
    <RicardianContract
      httpEndpoint={httpEndpoint}
      contractName={contractName}
      actionName={actionName}
      showClauses={showClauses}
      url={config.eosApiHost}
      title={title}
    />
  )
}
