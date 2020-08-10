import React, { useState, useEffect, Fragment } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import Link from '@material-ui/core/Link'

import { rpc } from '../../api/eosjs-api'
import DropzoneHash from '../DropzoneHash/DropzoneHash'

const IssuanceVerifier = ({
  code,
  scope,
  table,
  nodeLink,
  errorMsg,
  successMsg,
  verificationState,
  analyzeAnotherDoc,
  showInExplorer
}) => {
  const [verified, setVerified] = useState(undefined)
  const [showDropzone, setShowDropzone] = useState(true)
  const [tx, setTx] = useState()
  const [file, setFile] = useState(null)

  useEffect(() => {
    if (file && file.filehash) {
      const verifyTrxExistence = async () => {
        setShowDropzone(false)
        const { rows } = await rpc.get_table_rows({
          json: true,
          code: code,
          scope: scope,
          table: table,
          limit: 1,
          reverse: false,
          lower_bound: file.filehash,
          index_position: 2,
          key_type: 'sha256'
        })

        const txId = rows.length ? rows[0].tx : null
        const { traces } = await rpc.history_get_transaction(txId, null)

        if (traces[0].act.data.hash !== file.filehash.toUpperCase())
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
    }
  }, [file])

  return (
    <>
      {showDropzone && (
        <DropzoneHash
          file={file}
          deleteFile={() => {
            setFile(null)
            setShowDropzone(true)
          }}
          handleOnDropFile={(resultFile) => {
            setFile(resultFile)
            setShowDropzone(false)
          }}
        />
      )}
      {verified && (
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
                setShowDropzone(true)
              }}
              variant="contained"
              color="primary"
            >
              {analyzeAnotherDoc}
            </Button>
            {verified.severity === 'success' && (
              <Button color="secondary">
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
      )}
    </>
  )
}

IssuanceVerifier.propTypes = {
  code: PropTypes.string.isRequired,
  scope: PropTypes.string.isRequired,
  table: PropTypes.string.isRequired,
  nodeLink: PropTypes.string,
  errorMsg: PropTypes.string,
  successMsg: PropTypes.string,
  verificationState: PropTypes.string,
  analyzeAnotherDoc: PropTypes.string,
  showInExplorer: PropTypes.string
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
  showInExplorer: 'Ver en explorador'
}

export default IssuanceVerifier
