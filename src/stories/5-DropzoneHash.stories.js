import React from 'react'
import Box from '@material-ui/core/Box'

import DropzoneHash from '../DropzoneHash'

export default {
  title: 'DropzoneHash',
  component: DropzoneHash
}

export const DropzoneModal = () => <DropzoneHash useModal />
export const dropzone = () => (
  <Box width={400}>
    <DropzoneHash useModal={false} />
  </Box>
)
