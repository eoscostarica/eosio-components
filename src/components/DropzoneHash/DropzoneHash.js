import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import PropTypes from 'prop-types'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import DropzoneBase from '../common'

import FileComponent from './FileComponent'

const useStyles = makeStyles((theme) => ({
  papper: {
    [theme.breakpoints.up('md')]: {
      width: 660
    },
    height: 400,
    backgroundColor: 'red',
    margin: 'auto'
  },
  fullHeight: {
    height: '100%'
  },
  dropzoneBox: {
    height: '50vh',
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const DropzoneHash = ({ file, handleOnDropFile }) => {
  const [progress, setProgress] = useState(0)
  const classes = useStyles()

  const handleFileDeletion = () => {
    file(null)
    handleOnDropFile(null)
  }
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignContent="center"
          >
            <Box className={classes.dropzoneBox}>
              {file === null ? (
                <DropzoneBase
                  fileChange={(f) => handleOnDropFile(f)}
                  progressChange={(p) => setProgress(p)}
                />
              ) : progress < 100 ? (
                <LinearProgress variant="determinate" value={progress} />
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <FileComponent
                    onClick={handleFileDeletion}
                    filehash={file.filehash}
                    filesize={file.filesize}
                    filename={file.filename}
                    lastModifiedDate={file.lastModifiedDate}
                  >
                    {file.name}
                  </FileComponent>
                  <br />
                </Box>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

DropzoneHash.propTypes = {
  handleOnDropFile: PropTypes.func,
  sendButtonText: PropTypes.string,
  file: PropTypes.object
}

DropzoneHash.defaultProps = {
  handleOnDropFile: () => {},
  sendButtonText: 'Enviar'
}

export default DropzoneHash
