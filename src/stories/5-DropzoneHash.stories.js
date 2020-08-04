import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { action } from '@storybook/addon-actions'
import Box from '@material-ui/core/Box'

import DropzoneHash from '../components/DropzoneHash'

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

export const dropzone = () => {
  const classes = useStyles()

  return (
    <DropzoneHash
      handleOnDropFile={action('File')}
      customStyle={classes.dropBox}
    />
  )
}
