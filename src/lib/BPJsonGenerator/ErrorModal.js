import React from 'react'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import Modal from './Modal'
import Styles from './styles'

const useStyles = makeStyles(Styles)

const ErrorModal = ({ openModal, setOpenModal, message }) => {
  const classes = useStyles()

  return (
    <Modal openModal={openModal} setOpenModal={(value) => setOpenModal(value)}>
      <Grid container justify="center" className={classes.nodes}>
        <Grid>
          <Typography className={classes.sectionTitle} variant="h3">
            Error
          </Typography>
          <Typography variant="h5">
            {message}
          </Typography>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default ErrorModal