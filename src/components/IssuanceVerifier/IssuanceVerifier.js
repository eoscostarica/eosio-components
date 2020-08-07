import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import { rpc } from '../../api/eosjs-api'

const IssuanceVerifier = ({
  hash,
  nodeLink,
  verified,
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
        code: 'notarioeoscr', // TODO: obtener por props
        scope: 'notarioeoscr', // TODO: obtener por props
        table: 'libro', // TODO: obtener por props
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
          message: 'No se ha podido verificar la emisión de este documento' // TODO: obtener por props
        })
      else {
        setTx(txId)
        setVerified({
          state: true,
          severity: 'success',
          message: 'Emisión de documento verificada' // TODO: obtener por props
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
                setFile(null)
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

// TODO: agregar nuevos elementos a obtener por props
IssuanceVerifier.propTypes = {
  hash: PropTypes.string.isRequired,
  nodeLink: PropTypes.string.isRequired,
  verified: PropTypes.bool.isRequired,
  verificationState: PropTypes.string.isRequired,
  analyzeAnotherDoc: PropTypes.string.isRequired,
  showInExplorer: PropTypes.string.isRequired,
  verifyingDocState: PropTypes.string.isRequired
}

export default IssuanceVerifier
