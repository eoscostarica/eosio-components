import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import { useDropzone } from 'react-dropzone'

import styles from './styles'
const useStyles = makeStyles(styles)

const Dropzone = ({ onSubmit }) => {
  const classes = useStyles()
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: 'application/json'
  })

  useEffect(() => {
    if (!!!acceptedFiles.length) return
    const reader = new FileReader()
    reader.onload = (e) => {
      onSubmit(JSON.parse(e.target.result))
    }
    reader.readAsText(acceptedFiles[0])
  }, [acceptedFiles])

  return (
    <>
      <section>
        <div {...getRootProps({ className: classes.dropzoneArea })}>
          <input {...getInputProps()} />
          <p>Drop your BP json file here</p>
        </div>
      </section>
    </>
  )
}

Dropzone.propTypes = {
  onSubmit: PropTypes.func
}

export default Dropzone
