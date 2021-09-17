import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { useDropzone } from 'react-dropzone'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import * as CryptoJS from 'crypto-js'
import Box from '@material-ui/core/Box'
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import { parseFile } from '../../utils'

import Styles from './styles'

const SHA256_REGEX_VALIDATOR = /\b[A-Fa-f0-9]{64}\b/
const useStyles = makeStyles(Styles)

const DropzoneBase = ({
  fileChange,
  progressChange,
  dropzoneCaption,
  dropzoneButtonText,
  readErrorMessage
}) => {
  const classes = useStyles()
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

  const handleInputClick = (e) => e.preventDefault()

  return (
    <Box width="100%" height="100%">
      {!progress ? (
        <Box className={classes.dropzoneBox} {...getRootProps()}>
          <input
            multiple="false"
            accept=".json,.csv,.xls,.docx"
            onClick={handleInputClick}
            {...getInputProps()}
          />
          <Typography>
            <VerticalAlignTopIcon />
          </Typography>
          <Typography style={{ textTransform: 'none' }}>
            {dropzoneCaption}
          </Typography>
          <Button className={classes.dropzoneButton}>
            {dropzoneButtonText}
          </Button>
        </Box>
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
    </Box>
  )
}

DropzoneBase.propTypes = {
  fileChange: PropTypes.func.isRequired,
  progressChange: PropTypes.func.isRequired,
  dropzoneCaption: PropTypes.string,
  dropzoneButtonText: PropTypes.string,
  readErrorMessage: PropTypes.string
}

DropzoneBase.defaultProps = {
  dropzoneCaption: 'Arrastra y suelta el archivo aquí',
  dropzoneButtonText: 'Buscar Archivo',
  readErrorMessage: 'Ha ocurrido un error al leer el archivo'
}

export default DropzoneBase
