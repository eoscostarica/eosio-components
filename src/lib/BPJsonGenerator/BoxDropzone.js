import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import { useDropzone } from 'react-dropzone'

import ErrorModal from './ErrorModal'
import Styles from './styles'

const useStyles = makeStyles(Styles)

const Dropzone = ({ onSubmit }) => {
  const classes = useStyles()
  const [openModal, setOpenModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [lastFile, setLastFile] = useState([])
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: 'application/json'
  })

  useEffect(() => {
    if (!!!acceptedFiles.length) return

    const reader = new FileReader()

    reader.onload = (e) => {

      if (acceptedFiles[0] !== lastFile) {
        try {
          onSubmit(JSON.parse(e.target.result))
          setLastFile(acceptedFiles[0])
        } catch (error) {
          setErrorMessage(error instanceof SyntaxError ? "The file does not have the correct JSON format" : error.message)
          setOpenModal(true)
        }
      }
    }
    reader.readAsText(acceptedFiles[0])

  }, [acceptedFiles, lastFile, onSubmit])

  return (
    <>
      <section>
        <div {...getRootProps({ className: classes.dropzoneArea })}>
          <input {...getInputProps()} />
          <p>Drop your BP json file here</p>
        </div>
      </section>
      <ErrorModal
        openModal={openModal}
        setOpenModal={(value) => setOpenModal(value)}
        message={errorMessage} />
    </>
  )
}

Dropzone.propTypes = {
  onSubmit: PropTypes.func
}

export default Dropzone
