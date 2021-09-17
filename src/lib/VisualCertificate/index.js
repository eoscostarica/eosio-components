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
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import styled from '@material-ui/core/styles/styled'
import Paper from '@material-ui/core/Paper'

import { rpc } from '../api/eos-api'

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

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

const VisualCertificate = ({
  open,
  handleClose,
  txData,
  messages,
  title,
  fileText,
  accountText,
  lastModifiedText,
  verifyText,
  verifyingText,
  blockNumText,
  transactionIdText,
  queryTimeText,
  contractAccountText,
  seeInExplorerText,
  closeText,
  chainUrl
}) => {
  const [verifying, setVerifying] = useState(false)
  const [verificationDetails, setVerificationDetails] = useState()

  const verifyTransaction = (tx) => {
    setVerifying(true)
    rpc
      .history_get_transaction(tx)
      .then((x) => {
        setVerificationDetails({
          content: messages.success,
          severity: 'success',
          block_num: x.block_num,
          id: x.id,
          query_time: x.query_time_ms,
          contract_account: x.traces[0].act.account
        })
      })
      .catch(() => {
        setVerificationDetails({
          content: messages.error,
          severity: 'error'
        })
      })
      .finally(() => setVerifying(false))
  }

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      style={{ overflowY: 'auto' }}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <StyledDialogContent>
        <Box display="flex" flexDirection="column" justifyContent="start">
          <Typography>
            <strong>{fileText}:</strong> {txData.file}
          </Typography>
          <Typography>
            <strong>{accountText}:</strong> {txData.account}
          </Typography>
          <Typography>
            <strong>{lastModifiedText}:</strong> {txData.lastModified}
          </Typography>
          <Typography>
            <strong>Hash: </strong>
            <span style={{ fontSize: '.8em', maxWidth: '100%' }}>
              {txData.hash}
            </span>
          </Typography>
        </Box>
        <br />
        <Box display="flex" justifyContent="center" flexDirection="row">
          <Button
            onClick={() => verifyTransaction(txData.tx)}
            variant="contained"
            color="primary"
            endIcon={<FindInPageIcon />}
          >
            {verifying ? verifyingText : verifyText}
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
            severity="success"
          >
            {verificationDetails.content}
          </Alert>
        )}
        <br />
        {verificationDetails && verificationDetails.severity === 'success' && (
          <MessagesBox elevation={3}>
            <Typography>
              <strong>{blockNumText}: </strong> {verificationDetails.block_num}
            </Typography>
            <Typography>
              <strong>{transactionIdText}: </strong> {verificationDetails.id}
            </Typography>
            <Typography>
              <strong>{queryTimeText}: </strong>
              {verificationDetails.query_time} ms
            </Typography>
            <Typography>
              <strong>{contractAccountText}: </strong>
              {verificationDetails.contract_account}
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              alignContent="flex-end"
            >
              <Button variant="outlined" disableElevation>
                <Link
                  href={`${chainUrl}${verificationDetails.id}`}
                  target="_blank"
                >
                  {' '}
                  {seeInExplorerText}
                </Link>
              </Button>
            </Box>
          </MessagesBox>
        )}
        {verificationDetails && verificationDetails.severity === 'error' && (
          <Alert severity="error">{verificationDetails.content}</Alert>
        )}
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {closeText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

VisualCertificate.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  txData: PropTypes.object,
  messages: PropTypes.object,
  title: PropTypes.string,
  fileText: PropTypes.string,
  accountText: PropTypes.string,
  lastModifiedText: PropTypes.string,
  verifyText: PropTypes.string,
  verifyingText: PropTypes.string,
  blockNumText: PropTypes.string,
  transactionIdText: PropTypes.string,
  queryTimeText: PropTypes.string,
  contractAccountText: PropTypes.string,
  seeInExplorerText: PropTypes.string,
  closeText: PropTypes.string,
  chainUrl: PropTypes.string
}

export default VisualCertificate
