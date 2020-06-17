import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'

import RicardianContract from '../RicardianContract'

export default {
  title: 'RicardianContract',
  component: RicardianContract,
  decorators: [withKnobs]
}

export const ricardianContract = () => {
  const name = text('name', 'consent2life')

  return <RicardianContract name={name} />
}
