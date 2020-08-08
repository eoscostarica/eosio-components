import React from 'react'
import IssuanceVerifier from '../components/IssuanceVerifier'

export default {
  title: 'IssuanceVerifier',
  component: IssuanceVerifier
}

export const IssuanceVerifierWrapper = () => {
  return (
    <Grid item xs={12}>
      <IssuanceVerifier />
    </Grid>
  )
}
