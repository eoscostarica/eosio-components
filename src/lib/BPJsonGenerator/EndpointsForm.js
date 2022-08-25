import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Validator, NODE_TYPES, NODE_EXTRA_KEYS } from '../utils'
import Styles from './styles'

const useStyles = makeStyles(Styles)
const { hostValidation, urlInputValidation } = Validator
const EndpointsForm = ({ currentNode, handleOnChange }) => {
  const classes = useStyles()
  if (currentNode.node_type === NODE_TYPES.PRODUCER || currentNode.node_type === '') {
    return <></>
  }
  return (
    <>
      <Typography
        className={classes.sectionTitle}
        variant="h5"
      >
        Endpoints
      </Typography>
      {(NODE_EXTRA_KEYS[currentNode.node_type]?.indexOf('p2p_endpoint') > -1) && (
        <TextField
          onChange={(e) => handleOnChange('p2p_endpoint', e.target.value)}
          variant="outlined"
          label="P2P Endpoint"
          error={!hostValidation(currentNode.p2p_endpoint)}
          helperText={
            !hostValidation(currentNode.p2p_endpoint) && 'Invalid URL'
          }
          value={currentNode.p2p_endpoint || ''}
          className={classes.formFieldForm}
        />
      )}
      {(NODE_EXTRA_KEYS[currentNode.node_type]?.indexOf('api_endpoint') > -1) && (
        <TextField
          onChange={(e) => handleOnChange('api_endpoint', e.target.value)}
          variant="outlined"
          label="API Endpoint"
          error={!urlInputValidation(currentNode.api_endpoint)}
          helperText={
            !urlInputValidation(currentNode.api_endpoint) && 'Invalid URL'
          }
          value={currentNode.api_endpoint || ''}
          className={classes.formFieldForm}
        />
      )}
      {((NODE_EXTRA_KEYS[currentNode.node_type]?.indexOf('ssl_endpoint') > -1) &&
        <TextField
          onChange={(e) => handleOnChange('ssl_endpoint', e.target.value)}
          variant="outlined"
          label="SSL Endpoint"
          error={!urlInputValidation(currentNode.ssl_endpoint)}
          helperText={
            !urlInputValidation(currentNode.ssl_endpoint) && 'Invalid URL'
          }
          value={currentNode.ssl_endpoint || ''}
          className={classes.formFieldForm}
        />
      )}
    </>
  )
}

EndpointsForm.propTypes = {
  currentNode: PropTypes.object,
  handleOnChange: PropTypes.func,
}

export default EndpointsForm