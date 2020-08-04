import React, { useState, forwardRef } from 'react'
import Card from '@material-ui/core/Card'
import PropTypes from 'prop-types'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import { makeStyles } from '@material-ui/styles'
import DropzoneBase from '../common'

import FileComponent from './FileComponent'

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

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
  modalBox: {
    height: '50vh',
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center'
  }
}))

const DropzoneHash = ({
  handleOnDropFile,
  dropZoneDialogText,
  dropZoneDialogButton,
  sendButtonText,
  cancelButtonText
}) => {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const classes = useStyles()

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleFileDeletion = () => {
    setFile(null)
    handleOnDropFile(null)
  }
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <CardContent>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              {dropZoneDialogButton}
            </Button>
            <Dialog
              fullWidth
              maxWidth="sm"
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {dropZoneDialogText}
              </DialogTitle>
              <DialogContent className={classes.modalBox}>
                {file === null ? (
                  <DropzoneBase
                    fileChange={(f) => setFile(f)}
                    progressChange={(p) => setProgress(p)}
                  />
                ) : progress < 100 ? (
                  <LinearProgress variant="determinate" value={progress} />
                ) : (
                  <FileComponent
                    onClick={handleFileDeletion}
                    filehash={file.filehash}
                    filesize={file.filesize}
                    filename={file.filename}
                    lastModifiedDate={file.lastModifiedDate}
                  >
                    {file.name}
                  </FileComponent>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  {cancelButtonText}
                </Button>
                <Button onClick={handleClose} color="primary">
                  {sendButtonText}
                </Button>
              </DialogActions>
            </Dialog>
          </CardContent>
        </CardContent>
      </Card>
    </Grid>
  )
}

DropzoneHash.propTypes = {
  handleOnDropFile: PropTypes.func,
  dropZoneDialogText: PropTypes.string,
  dropZoneDialogButton: PropTypes.string,
  cancelButtonText: PropTypes.string,
  sendButtonText: PropTypes.string
}

DropzoneHash.defaultProps = {
  handleOnDropFile: () => {},
  dropZoneDialogText: 'Selección de Archivo',
  dropZoneDialogButton: 'Abrir dialogo',
  cancelButtonText: 'Cancelar',
  sendButtonText: 'Enviar'
}

export default DropzoneHash
