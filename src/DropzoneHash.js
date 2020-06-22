//#region imports
import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
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
import { parseFile } from './util/filereader'
import FileComponent from './FileComponent'
//#endregion

//#region global declarations
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const SHA256_REGEX_VALIDATOR = /\b[A-Fa-f0-9]{64}\b/

const useStyles = makeStyles(theme => ({
  papper: {
    [theme.breakpoints.up('md')]: {
      width: '660px'
    },
    height: '400px',
    backgroundColor: 'red',
    margin: 'auto'
  },
  dropzoneBox: {
    maxWidth: '620px',
    minHeight: '300px',
    cursor: 'pointer',
    backgroundColor: theme.palette.background.lightgray,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    border: 'dashed 2px #212121',
    borderRadius: '2px',
    alignContent: 'center',
    textAlign: 'center',
    textTransform: 'uppercase',
    padding: '2%',
    '&': {
      textAlign: 'center'
    }
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

//#endregion

const DropzoneHash = () => {
  const [open, setOpen] = React.useState(false)
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const classes = useStyles()
  const sha256 = CryptoJS.algo.SHA256.create()

  const onDrop = files => {
    setFile(file => ({
      ...file,
      filename: files[0].name,
      filesize: `${(files[0].size / (1024 * 1024)).toFixed(2)} MB`,
      lastModifiedDate: `${files[0].lastModifiedDate}`
    }))
    parseFile(
      files[0],
      r => sha256.update(String(r)),
      p => setProgress(Math.trunc(p))
    )
    handleInputHashCreator()
  }
  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleInputHashCreator = () => {
    const result = sha256.finalize()
    const isHasValid = SHA256_REGEX_VALIDATOR.test(result)
    isHasValid
      ? setFile(file => ({ ...file, filehash: String(result) }))
      : setFile(null)
  }

  const handleFileDeletion = () => {
    setFile(null)
  }

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
              Abrir dialogo
            </Button>
            <Dialog
              fullWidth={true}
              maxWidth={'sm'}
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-labelledby='alert-dialog-slide-title'
              aria-describedby='alert-dialog-slide-description'
            >
              <DialogTitle id='alert-dialog-slide-title'>
                Selección de Archivo
              </DialogTitle>
              <DialogContent {...getRootProps()}>
                {file === null ? (
                  <div className={classes.dropzoneBox}>
                    <input
                      multiple='false'
                      onClick={e => e.preventDefault()}
                      {...getInputProps()}
                    />
                    <Typography>
                      <VerticalAlignTopIcon />
                    </Typography>
                    <Typography>Arrastrá y Soltá el Archivo Aquí</Typography>
                    <DropzoneButton>Buscar Archivo</DropzoneButton>
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
                  Cancelar
                </Button>
                <Button onClick={handleClose} color='primary'>
                  Enviar
                </Button>
              </DialogActions>
            </Dialog>
          </CardContent>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default DropzoneHash
