import React from 'react'
import { action } from '@storybook/addon-actions'
import Box from '@material-ui/core/Box'

import DropzoneHash from '../DropzoneHash'

export default {
  title: 'DropzoneHash',
  component: DropzoneHash
}

export const DropzoneModal = () => (
  <DropzoneHash useModal handleOnDropFile={action('File')} />
)
export const dropzone = () => (
  <Box width={400} height={200}>
    <DropzoneHash useModal={false} handleOnDropFile={action('File')} />
  </Box>
)
