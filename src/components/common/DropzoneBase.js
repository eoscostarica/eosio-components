import React, { useState } from 'react'
import { styled } from '@material-ui/core/styles'
import { useDropzone } from 'react-dropzone'
import LinearProgress from '@material-ui/core/LinearProgress'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import * as CryptoJS from 'crypto-js'
import { parseFile } from '../../utils/filereader'
import { Box } from '@material-ui/core'
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
const SHA256_REGEX_VALIDATOR = /\b[A-Fa-f0-9]{64}\b/

const DropzoneBox = styled(Box)({
  width: '100%',
  height: '100%',
  backgroundColor: 'lightgray',
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
})

const DropzoneButton = styled(Button)({
  width: '236px',
  height: '36px',
  border: '.5px solid lightgray',
  borderRadius: '2px',
  marginLeft: 'auto',
  marginRight: 'auto'
})

const DropzoneBase = ({
  fileChange,
  progressChange,
  dropzoneCaption,
  dropzoneButtonText,
  readErrorMessage
}) => {
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState({})
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const sha256 = CryptoJS.algo.SHA256.create('')
  const onDrop = (files) => {
    parseFile(
      files[0],
      (r) =>
        r !== true && !(r instanceof Error)
          ? sha256.update(String(r))
          : handleInputHashCreator(files[0], r),
      (p) => {
        setProgress(Math.trunc(p))
        progressChange(Math.trunc(p))
      }
    )
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleInputHashCreator = (files, r) => {
    const result = String(sha256.finalize())
    const isHashValid = SHA256_REGEX_VALIDATOR.test(result)
    if (isHashValid) {
      fileChange({
        filename: files.name,
        filesize: `${(files.size / (1024 * 1024)).toFixed(2)} MB`,
        lastModifiedDate: `${files.lastModifiedDate}`,
        filehash: result
      })
      if (r instanceof Error) {
        setMessage({
          content: { readErrorMessage },
          severity: 'error'
        })
        setOpenSnackbar(true)
      }
    } else fileChange(null)
  }

  return (
    <>
      {!progress ? (
        <DropzoneBox {...getRootProps()}>
          <input
            multiple="false"
            accept=".json,.csv,.xls,.docx"
            onClick={(e) => e.preventDefault()}
            {...getInputProps()}
          />
          <Typography>
            <VerticalAlignTopIcon />
          </Typography>
          <Typography>{dropzoneCaption}</Typography>
          <DropzoneButton>{dropzoneButtonText}</DropzoneButton>
        </DropzoneBox>
      ) : (
        <LinearProgress variant="determinate" value={progress} />
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          severity={message.severity}
          onClose={() => setOpenSnackbar(false)}
        >
          {message.content}
        </Alert>
      </Snackbar>
    </>
  )
}

DropzoneBase.propTypes = {
  fileChange: PropTypes.func.isRequired,
  file: PropTypes.object.isRequired,
  progressChange: PropTypes.func.isRequired,
  dropzoneCaption: PropTypes.string,
  dropzoneButtonText: PropTypes.string,
  readErrorMessage: PropTypes.string
}

DropzoneBase.defaultProps = {
  dropzoneCaption: 'Arrastrá y Soltá el Archivo Aquí',
  dropzoneButtonText: 'Buscar Archivo',
  readErrorMessage: 'Ha ocurrido un error al leer el archivo'
}

export default DropzoneBase
