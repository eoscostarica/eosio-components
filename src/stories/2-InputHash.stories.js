import React from 'react'
import { action } from '@storybook/addon-actions'

import InputHash from '../InputHash'

export default {
  title: 'InputHash',
  component: InputHash
}

export const InputHashCreator = () => <InputHash handleOnChange={action('Result')} />
export const InputHashValidator = () => <InputHash useHashValidator handleOnChange={action('Result')} />