import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import LinearProgress from '@material-ui/core/LinearProgress'
import Link from '@material-ui/core/Link'
import { rpc } from '../../api/eosjs-api'

const IssuanceVerifier = ({
  code,
  scope,
  table,
  hash,
  nodeLink,
  errorMsg,
  successMsg,
  verificationState,
  analyzeAnotherDoc,
  showInExplorer,
  verifyingDocState
}) => {
  const [verified, setVerified] = useState(undefined)
  const [tx, setTx] = useState()

  useEffect(() => {
    const verifyTrxExistence = async () => {
      const { rows } = await rpc.get_table_rows({
        json: true,
        code: code,
        scope: scope,
        table: table,
        limit: 1,
        reverse: false,
        lower_bound: hash,
        index_position: 2,
        key_type: 'sha256'
      })

      const txId = rows.length ? rows[0].tx : null
      const { traces } = await rpc.history_get_transaction(txId, null)

      if (traces[0].act.data.hash !== hash.toUpperCase())
        setVerified({
          state: false,
          severity: 'error',
          message: errorMsg
        })
      else {
        setTx(txId)
        setVerified({
          state: true,
          severity: 'success',
          message: successMsg
        })
      }
    }

    verifyTrxExistence()
  }, [])

  return (
    <Box>
      {verified ? (
        <Box>
          <Typography>{verificationState}</Typography>
          <Alert severity={verified.severity}>{verified.message}</Alert>
          <br />
          <Box display="flex" flexDirection="row" justifyContent="space-evenly">
            <Button
              onClick={(e) => {
                e.preventDefault()
                //setFile(null)
                setVerified(undefined)
              }}
              variant="contained"
              color="primary"
            >
              {analyzeAnotherDoc}
            </Button>
            {verified.severity === 'success' && (
              <Button color="secondary">
                {' '}
                <Link
                  href={`${nodeLink}/${tx}`}
                  target="_blank"
                  color="secondary"
                >
                  {showInExplorer}
                </Link>
              </Button>
            )}
          </Box>
        </Box>
      ) : (
        <Box display="flex" alignContent="center" justifyContent="center">
          <Typography>{verifyingDocState}</Typography>
          <LinearProgress />
        </Box>
      )}
    </Box>
  )
}

IssuanceVerifier.propTypes = {
  code: PropTypes.string.isRequired,
  scope: PropTypes.string.isRequired,
  table: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  nodeLink: PropTypes.string,
  errorMsg: PropTypes.string,
  successMsg: PropTypes.string,
  verificationState: PropTypes.string,
  analyzeAnotherDoc: PropTypes.string,
  showInExplorer: PropTypes.string,
  verifyingDocState: PropTypes.string
}

IssuanceVerifier.defaultProps = {
  code: 'notarioeoscr',
  scope: 'notarioeoscr',
  table: 'libro',
  nodeLink: 'https://jungle3.bloks.io/transaction',
  errorMsg: 'No se ha podido verificar la emisión de este documento',
  successMsg: 'Emisión de documento verificada',
  verificationState: 'Estado de verificación',
  analyzeAnotherDoc: 'Analizar otro documento',
  showInExplorer: 'Ver en explorador',
  verifyingDocState: 'Verificando estado de documento...'
}

export default IssuanceVerifier
