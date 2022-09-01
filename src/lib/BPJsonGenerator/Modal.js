import React from 'react'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'

import Styles from './styles'

const useStyles = makeStyles(Styles)

const MapModal = ({ openModal, setOpenModal, children }) => {
  const classes = useStyles()

  const handleOpen = () => {
    setOpenModal(!openModal)
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModal}
      onClose={handleOpen}
      closeAfterTransition
    >
      <Fade in={openModal}>
        <Paper className={classes.paper}>
          <Box className={classes.closeIcon}>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleOpen}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Grid
            container
            justify="center"
            alignContent="center"
            alignItems="center"
            className={classes.bodyWrapper}
          >
            {children}
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  )
}

MapModal.propTypes = {
  openModal: PropTypes.bool,
  children: PropTypes.any,
  setOpenModal: PropTypes.func
}

MapModal.defaultProps = {
  openModal: false
}

export default MapModal
