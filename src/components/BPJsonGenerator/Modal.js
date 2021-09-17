import React from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

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
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
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
