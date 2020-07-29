import React, { useState, useEffect } from 'react'
import VisualCertificate from '../components/VisualCertificate'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import { rpc } from '../api/eosjs-api'
export default {
  title: 'VisualCertificate',
  component: VisualCertificate
}

export const VisualCertificateWrapper = () => {
  const [txData, setTxData] = useState()
  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchTransactionInfo = async () => {
      await rpc
        .history_get_transaction(
          'fd60fe3eaddbbcc2a37f7b110c8a62554d981043ebec684fd6c66223adf70520'
        )
        .then((r) => {
          setTxData({
            block_num: r.block_num,
            block_time: r.block_time,
            file: r.traces[0].act.data.titulo,
            account: r.traces[0].act.data.usuario,
            company: r.traces[0].act.data.comentario,
            hash: r.traces[0].act.data.hash,
            tx:
              'fd60fe3eaddbbcc2a37f7b110c8a62554d981043ebec684fd6c66223adf70520',
            lastModified: r.block_time
          })
          setLoading(false)
        })
        .catch((e) => console.error(e))
    }

    fetchTransactionInfo()
  }, [])

  const handleClose = () => setOpen(!open)

  if (loading)
    return (
      <Box mt={5} width='100%'>
        <Typography variant='h5' align='center'>
          {'Loading BP Json...'.toUpperCase()}
        </Typography>
        <LinearProgress color='secondary' />
      </Box>
    )

  return (
    <Grid item xs={12}>
      <VisualCertificate
        txData={txData}
        handleClose={handleClose}
        open={open}
      />
    </Grid>
  )
}
