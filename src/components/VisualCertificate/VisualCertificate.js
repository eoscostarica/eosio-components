import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import Slide from '@material-ui/core/Slide'
import FindInPageIcon from '@material-ui/icons/FindInPage'
import { rpc } from '../../api/eosjs-api'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import styled from '@material-ui/core/styles/styled'
import Paper from '@material-ui/core/Paper'

const StyledDialogContent = styled(DialogContent)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
})
const MessagesBox = styled(Paper)({
  borderRadius: '2px',
  border: '0.5px dashed gray',
  padding: '3%'
})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const VisualCertificate = ({ open, handleClose, txData }) => {
  const [verifying, setVerifying] = useState(false)
  const [verificationDetails, setVerificationDetails] = useState()

  const verifyTransaction = (tx) => {
    setVerifying(true)
    rpc
      .history_get_transaction(tx)
      .then((x) => {
        setVerificationDetails({
          content: `Transacción ${tx} verificada correctamente`,
          severity: 'success',
          block_num: x.block_num,
          id: x.id,
          query_time: x.query_time_ms,
          contract_account: x.traces[0].act.account
        })
      })
      .catch(() => {
        setVerificationDetails({
          content: `No se pudo verificar la existencia de la transacción ${tx}`,
          severity: 'error'
        })
      })
      .finally(() => setVerifying(false))
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'md'}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>Detalles de la transacción</DialogTitle>
      <StyledDialogContent>
        <Box display='flex' flexDirection='column' justifyContent='start'>
          <Typography>
            <strong>Título:</strong> {txData.file}
          </Typography>
          <Typography>
            <strong>Usuario:</strong> {txData.account}
          </Typography>
          <Typography>
            <strong>Última modificación:</strong> {txData.lastModified}
          </Typography>
          <Typography>
            <strong>Hash: </strong>
            <span style={{ fontSize: '.8em', maxWidth: '100%' }}>
              {txData.hash}
            </span>
          </Typography>
        </Box>
        <br />
        <Box display='flex' justifyContent='center' flexDirection='row'>
          <Button
            onClick={() => verifyTransaction(txData.tx)}
            variant='contained'
            color='primary'
            // disabled={messages.length > 0 && messages.length < 6}
            endIcon={<FindInPageIcon />}
          >
            {verifying ? 'Verificando' : 'Verificar'}
            <>
              {verifying && (
                <CircularProgress style={{ color: 'white' }} size={24} />
              )}
            </>
          </Button>
        </Box>
        <br />
        {verificationDetails && (
          <Alert
            style={{ backgroundColor: 'green', color: 'white' }}
            severity='success'
          >
            {verificationDetails.content}
          </Alert>
        )}
        <br />
        {verificationDetails && verificationDetails.severity === 'success' && (
          <MessagesBox elevation={3}>
            <Typography>
              <strong># bloque: </strong> {verificationDetails.block_num}
            </Typography>
            <Typography>
              <strong>ID transacción: </strong> {verificationDetails.id}
            </Typography>
            <Typography>
              <strong>Tiempo de consulta: </strong>
              {verificationDetails.query_time} milisegundos
            </Typography>
            <Typography>
              <strong>Cuenta del contrato: </strong>
              {verificationDetails.contract_account}
            </Typography>
            <Box
              display='flex'
              flexDirection='row'
              justifyContent='flex-end'
              alignContent='flex-end'
            >
              <Button variant='outlined' disableElevation>
                <Link
                  href={`https://jungle3.bloks.io/transaction/${verificationDetails.id}`}
                  target='_blank'
                >
                  {' '}
                  Ver en explorador{' '}
                </Link>
              </Button>
            </Box>
          </MessagesBox>
        )}
        {verificationDetails && verificationDetails.severity === 'error' && (
          <Alert severity='error'>{verificationDetails.content}</Alert>
        )}
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

VisualCertificate.propTypes = {
  open: PropTypes.bool,
  handleCose: PropTypes.func,
  txData: PropTypes.object
}

export default VisualCertificate
