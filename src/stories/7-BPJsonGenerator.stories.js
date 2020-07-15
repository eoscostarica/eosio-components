import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'

import BPJsonGeneratorComponent from '../components/BPJsonGenerator'
import { eosApi } from '../api/eosjs-api'

export default {
  title: 'BPJsonGenerator',
  component: BPJsonGeneratorComponent,
  decorators: [withKnobs]
}

export const EditBPJson = ({ ual }) => {
  const accountName = text('accountName', 'junglemorpho')
  const [bpJson, setBpJson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isNotABP, setIsNotABP] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const { rows } = await eosApi.getTableRows({
          json: true,
          scope: 'eosio',
          code: 'eosio',
          table: 'producers',
          limit: 1,
          lower_bound: accountName
        })

        if (!rows.length || rows[0].owner !== accountName) {
          setIsNotABP(true)
          setLoading(false)

          return
        }

        if (!rows[0].url) {
          setBpJson(null)
          setLoading(false)

          return
        }

        const result = await axios(`${rows[0].url}/bp.json`)

        setBpJson(result.data || null)

        setLoading(false)
      } catch (error) {
        console.log({ message: error.message })
        setLoading(false)
      }
    }

    getData()
  }, [accountName])

  if (loading)
    return (
      <Box mt={5} width='100%'>
        <Typography variant='h5' align='center'>
          {'Loading BP Json...'.toUpperCase()}
        </Typography>
        <LinearProgress color='secondary' />
      </Box>
    )

  if (isNotABP)
    return (
      <Box mt={5} width='100%'>
        <Typography variant='h5' align='center'>
          {'You need to register as Block Producer!'.toUpperCase()}
        </Typography>
      </Box>
    )

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <BPJsonGeneratorComponent
            accountName={accountName}
            bpJson={bpJson}
            onSubmit={action('BP Json')}
          />
        </CardContent>
      </Card>
    </Grid>
  )
}
