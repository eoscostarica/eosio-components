import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import DescriptionIcon from '@mui/icons-material/Description'

import Styles from './styles'

const useStyles = makeStyles(Styles)

const FileComponent = ({
  filename,
  filesize,
  filehash,
  lastModifiedDate,
  onClick
}) => {
  const classes = useStyles()

  return (
    <Container className={classes.detailsContainer}>
      <Box className={classes.fileBox}>
        <DescriptionIcon />
        <Typography className={classes.fileDetailsHeader}>
          {filename}
          <Button
            className={classes.styledButton}
            onClick={onClick}
            variant="contained"
          >
            <DeleteIcon />
          </Button>
        </Typography>
        <br />
      </Box>
      <Typography className={classes.fileDetails}>
        Tamaño: {filesize}
      </Typography>
      <Typography className={classes.fileDetails}>
        Última modificación: {lastModifiedDate}
      </Typography>
      <Typography className={classes.fileDetails}>Hash: {filehash}</Typography>
    </Container>
  )
}

FileComponent.propTypes = {
  filename: PropTypes.string,
  filesize: PropTypes.string,
  filehash: PropTypes.string,
  lastModifiedDate: PropTypes.string,
  onClick: PropTypes.func
}

export default FileComponent
