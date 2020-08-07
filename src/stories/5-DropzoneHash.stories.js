import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'

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
  const [file, setFile] = useState(null)
  const classes = useStyles()

  return (
    <DropzoneHash
      file={file}
      deleteFile={() => setFile(null)}
      handleOnDropFile={(resultFile) => setFile(resultFile)}
      customStyle={classes.dropBox}
    />
  )
}
