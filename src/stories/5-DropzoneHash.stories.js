import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { action } from '@storybook/addon-actions'
import Box from '@material-ui/core/Box'

import DropzoneHash from '../DropzoneHash'

const useStyles = makeStyles({
  dropBox: {
    display: 'flex',
    justifyContent: 'center'
  }
})

export default {
  title: 'DropzoneHash',
  component: DropzoneHash
}

export const DropzoneModal = () => (
  <DropzoneHash useModal handleOnDropFile={action('File')} />
)
export const dropzone = () => {
  const classes = useStyles()

  return (
    <Box height={200}>
      <DropzoneHash
        useModal={false}
        handleOnDropFile={action('File')}
        customStyle={classes.dropBox}
      />
    </Box>
  )
}
