import React from 'react'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ReportIcon from '@mui/icons-material/Report'

import Modal from './Modal'
import Styles from './styles'

const useStyles = makeStyles(Styles)

const ErrorModal = ({ openModal, setOpenModal, message }) => {
  const classes = useStyles()

  return (
    <Modal openModal={openModal} setOpenModal={(value) => setOpenModal(value)}>
      <Grid
        container
        flexDirection="column"
        justify="center"
        alignItems="center"
        className={classes.nodes}
      >
        <ReportIcon className={classes.iconError} />
        <Typography className={classes.sectionTitle} variant="h4" component="p">
          Error
        </Typography>
        <Typography variant="h6" component="p">
          {message}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.addButton}
          onClick={() => {
            setOpenModal(false)
          }}
        >
          {'OK'}
        </Button>
      </Grid>
    </Modal>
  )
}

export default ErrorModal
