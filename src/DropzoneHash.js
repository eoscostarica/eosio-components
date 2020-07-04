import React, { useState, forwardRef } from 'react'
import Card from '@material-ui/core/Card'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop'
import Slide from '@material-ui/core/Slide'
import { styled } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useDropzone } from 'react-dropzone'
import * as CryptoJS from 'crypto-js'

import { parseFile } from './utils/fileReader'
import FileComponent from './FileComponent'

const Transition = forwardRef((props, ref) => {
  return <Slide direction='up' ref={ref} {...props} />
})

const SHA256_REGEX_VALIDATOR = /\b[A-Fa-f0-9]{64}\b/

const useStyles = makeStyles((theme) => ({
  papper: {
    [theme.breakpoints.up('md')]: {
      width: 660
    },
    height: 400,
    backgroundColor: 'red',
    margin: 'auto'
  },
  dropzoneBox: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.lightgray,
    cursor: 'pointer',
    display: 'flex',
    maxWidth: 620,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    border: 'dashed 2px #212121',
    borderRadius: 2,
    alignContent: 'center',
    textAlign: 'center',
    textTransform: 'uppercase',
    padding: '2%',
    '&': {
      textAlign: 'center'
    }
  },
  fullHeight: {
    height: '100%'
  },
  modalBox: {
    height: 300
  }
}))

const DropzoneButton = styled(Button)({
  width: '236px',
  height: '36px',
  border: '.5px solid lightgray',
  borderRadius: '2px',
  marginLeft: 'auto',
  marginRight: 'auto'
})

const DropzoneHash = ({
  useModal,
  handleOnDropFile,
  dropZoneButtonText,
  dropZoneText,
  dropZoneDialogText,
  dropZoneDialogButton,
  sendButtonText,
  cancelButtonText,
  customStyle
}) => {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [stringReader] = useState([])
  const [progress, setProgress] = useState(0)
  const classes = useStyles()
  const sha256 = CryptoJS.algo.SHA256.create()

  const onDrop = (files) => {
    setFile((file) => ({
      ...file,
      filename: files[0].name,
      filesize: `${(files[0].size / (1024 * 1024)).toFixed(2)} MB`,
      lastModifiedDate: `${files[0].lastModifiedDate}`
    }))

    parseFile(
      files[0],
      (r) => stringReader.push(String(r)),
      (p) => setProgress(Math.trunc(p))
    )
    handleInputHashCreator()
  }
  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleInputHashCreator = () => {
    for (let index = 0; index < stringReader.length; index++) {
      sha256.update(stringReader[index])
    }

    const result = sha256.finalize()
    const isHasValid = SHA256_REGEX_VALIDATOR.test(result)

    if (isHasValid) {
      setFile((file) => {
        const resultFile = { ...file, filehash: String(result) }
        handleOnDropFile(resultFile)

        return resultFile
      })
    } else {
      setFile(null)
      handleOnDropFile(null)
    }
  }

  const handleFileDeletion = () => {
    setFile(null)
    handleOnDropFile(null)
  }

  if (useModal) {
    return (
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <CardContent>
              <Button
                variant='outlined'
                color='primary'
                onClick={handleClickOpen}
              >
                {dropZoneDialogButton}
              </Button>
              <Dialog
                fullWidth
                maxWidth='sm'
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby='alert-dialog-slide-title'
                aria-describedby='alert-dialog-slide-description'
              >
                <DialogTitle id='alert-dialog-slide-title'>
                  {dropZoneDialogText}
                </DialogTitle>
                <DialogContent className={classes.modalBox} {...getRootProps()}>
                  {file === null ? (
                    <div className={classes.dropzoneBox}>
                      <input
                        multiple='false'
                        onClick={(e) => e.preventDefault()}
                        {...getInputProps()}
                      />
                      <Typography>
                        <VerticalAlignTopIcon />
                      </Typography>
                      <Typography>{dropZoneText}</Typography>
                      <DropzoneButton>{dropZoneButtonText}</DropzoneButton>
                    </div>
                  ) : progress < 100 ? (
                    <LinearProgress variant='determinate' value={progress} />
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
                  <Button onClick={handleClose} color='primary'>
                    {cancelButtonText}
                  </Button>
                  <Button onClick={handleClose} color='primary'>
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

  return (
    <Box className={clsx(classes.fullHeight, customStyle)} {...getRootProps()}>
      {file === null ? (
        <div className={classes.dropzoneBox}>
          <input
            multiple='false'
            onClick={(e) => e.preventDefault()}
            {...getInputProps()}
          />
          <Typography>
            <VerticalAlignTopIcon />
          </Typography>
          <Typography>{dropZoneText}</Typography>
          <DropzoneButton>{dropZoneButtonText}</DropzoneButton>
        </div>
      ) : progress < 100 ? (
        <LinearProgress variant='determinate' value={progress} />
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
    </Box>
  )
}

DropzoneHash.propTypes = {
  useModal: PropTypes.bool,
  handleOnDropFile: PropTypes.func,
  dropZoneButtonText: PropTypes.string,
  dropZoneText: PropTypes.string,
  dropZoneDialogText: PropTypes.string,
  dropZoneDialogButton: PropTypes.string,
  cancelButtonText: PropTypes.string,
  sendButtonText: PropTypes.string,
  customStyle: PropTypes.any
}

DropzoneHash.defaultProps = {
  useModal: true,
  handleOnDropFile: () => {},
  dropZoneButtonText: 'Buscar Archivo',
  dropZoneText: 'Arrastrá y Soltá el Archivo Aquí',
  dropZoneDialogText: 'Selección de Archivo',
  dropZoneDialogButton: 'Abrir dialogo',
  cancelButtonText: 'Cancelar',
  sendButtonText: 'Enviar',
  customStyle: {}
}

export default DropzoneHash
