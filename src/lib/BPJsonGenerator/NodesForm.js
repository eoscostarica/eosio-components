import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'

import { Validator } from '../utils'

import Styles from './styles'
import Modal from './Modal'

const nodeTypes = [
  {
    label: 'Producer',
    value: 'producer',
    info: ''
  },
  {
    label: 'Query',
    value: 'query',
    info: ''
  },
  {
    label: 'Seed',
    value: 'seed',
    info: ''
  }
]

const features = [
  {
    label: 'chain-api',
    value: 'chain-api',
    info: 'basic eosio::chain_api_plugin (/v1/chain/*)'
  },
  {
    label: 'account-query',
    value: 'account-query',
    info: '(/v1/chain/get_accounts_by_authorizers)'
  },
  {
    label: 'history-v1',
    value: 'history-v1',
    info: '(/v1/history/*)'
  },
  {
    label: 'hyperion-v2',
    value: 'hyperion-v2',
    info: '(/v2/*)'
  },
  {
    label: 'dfuse',
    value: 'dfuse',
    info: ''
  },
  {
    label: 'fio-api',
    value: 'fio-api',
    info: ''
  },
  {
    label: 'snapshot-api',
    value: 'snapshot-api',
    info: ''
  },
  {
    label: 'dsp-api',
    value: 'dsp-api',
    info: ''
  },
  {
    label: 'atomic-assets-api',
    value: 'atomic-assets-api',
    info: '',
  }
]

const defaultNode = {
  location: {
    name: '',
    country: '',
    latitude: 0,
    longitude: 0
  },
  node_type: '',
  full: false,
  p2p_endpoint: '',
  api_endpoint: '',
  ssl_endpoint: '',
  features: []
}

const useStyles = makeStyles(Styles)

const NodesForm = ({ nodes, nodeIndex, onSubmit, openModal, setOpenModal }) => {

  const {
    urlInputValidation,
    latitudeValidation,
    longitudeValidation,
    countryValidation,
    hostValidation
  } = Validator

  const classes = useStyles()
  const [currentNode, setCurrentNode] = useState(defaultNode)

  const handleOnChange = (key, value) => {
    setCurrentNode({ ...currentNode, [key]: value })
  }

  const handleOnChangeLocation = (key, value) => {
    setCurrentNode({
      ...currentNode,
      location: { ...currentNode.location, [key]: value }
    })
  }

  const handleOnChangeFeatures = (event) => {
    setCurrentNode((prevValue) => ({
      ...prevValue,
      features: event.target.value
    }))
  }

  const deleteEmptyKeyValues = () => {
    const aux = currentNode
    if (aux.features?.length === 0) delete aux.features
    Object.keys(aux).forEach((k) => {
      if (aux[k] === '') delete aux[k]
    })

    return aux
  }

  const handleOnSubmit = () => {
    if (nodeIndex !== null) {
      const newNodes = [...nodes]
      newNodes[nodeIndex] = deleteEmptyKeyValues()
      onSubmit(newNodes)
    } else {
      onSubmit([...nodes, deleteEmptyKeyValues()])
    }

    setCurrentNode(defaultNode)
    setOpenModal(false)
  }

  useEffect(() => {
    setCurrentNode(nodes[nodeIndex] || defaultNode)
  }, [nodes, nodeIndex])

  return (
    <Modal openModal={openModal} setOpenModal={(value) => setOpenModal(value)}>
      <Grid container justify="center" className={classes.nodes}>
        <Grid className={classes.wrapperForm}>
          <Typography className={classes.sectionTitle} variant="h5">
            Nodes
          </Typography>

          <TextField
            onChange={(e) => handleOnChange('node_type', e.target.value)}
            variant="outlined"
            label="Node Type"
            select
            value={currentNode.node_type}
            className={classes.formFieldForm}
          >
            {nodeTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Typography variant="body1" align="center">
            Full
          </Typography>
          <Checkbox
            onClick={(e) => handleOnChange('full', e.target.checked)}
            checked={currentNode.full}
          />
        </Grid>

        <Grid className={classes.wrapperForm}>
          <Typography className={classes.sectionTitle} variant="h5">
            Location
          </Typography>

          <Grid className={classes.locationWrapper}>
            <TextField
              onChange={(e) => handleOnChangeLocation('name', e.target.value)}
              variant="outlined"
              label="Name"
              value={currentNode.location.name}
              className={classes.formFieldForm}
            />
            <TextField
              onChange={(e) =>
                handleOnChangeLocation('country', e.target.value.toUpperCase())
              }
              variant="outlined"
              label="Country"
              error={!countryValidation(currentNode.location.country)}
              helperText={
                !countryValidation(currentNode.location.country) && 'The country code must be two letters'
              }
              value={currentNode.location.country}
              className={classes.formFieldForm}
            />
            <TextField
              onChange={(e) =>
                handleOnChangeLocation('latitude', Number(e.target.value))
              }
              variant="outlined"
              label="Latitude"
              type="number"
              error={!latitudeValidation(currentNode.location.latitude)}
              helperText={
                !latitudeValidation(currentNode.location.latitude) && 'The latitude range is between -90 and 90'
              }
              value={currentNode.location.latitude}
              className={classes.formFieldForm}
            />
            <TextField
              onChange={(e) =>
                handleOnChangeLocation('longitude', Number(e.target.value))
              }
              variant="outlined"
              label="Longitude"
              type="number"
              error={!longitudeValidation(currentNode.location.longitude)}
              helperText={
                !longitudeValidation(currentNode.location.longitude) && 'The longitude range is between -180 and 180'
              }
              value={currentNode.location.longitude}
              className={classes.formFieldForm}
            />
          </Grid>
        </Grid>

        <Grid className={classes.wrapperForm}>
          <Typography
            style={{
              display:
                currentNode.node_type === 'producer' ||
                  currentNode.node_type === ''
                  ? 'none'
                  : undefined
            }}
            className={classes.sectionTitle}
            variant="h5"
          >
            Endpoints
          </Typography>

          <TextField
            style={{
              display: currentNode.node_type !== 'seed' ? 'none' : undefined
            }}
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

          <TextField
            onChange={(e) => handleOnChange('api_endpoint', e.target.value)}
            style={{
              display: currentNode.node_type !== 'query' ? 'none' : undefined
            }}
            variant="outlined"
            label="API Endpoint"
            error={!urlInputValidation(currentNode.api_endpoint)}
            helperText={
              !urlInputValidation(currentNode.api_endpoint) && 'Invalid URL'
            }
            value={currentNode.api_endpoint || ''}
            className={classes.formFieldForm}
          />

          <TextField
            style={{
              display: currentNode.node_type !== 'query' ? 'none' : undefined
            }}
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
        </Grid>

        <Grid className={classes.wrapperForm}>
          <Typography
            style={{
              display: currentNode.node_type !== 'query' ? 'none' : undefined
            }}
            className={classes.sectionTitle}
            variant="h5"
          >
            Features
          </Typography>

          <TextField
            style={{
              display: currentNode.node_type !== 'query' ? 'none' : undefined
            }}
            onChange={handleOnChangeFeatures}
            variant="outlined"
            label="Node Feactures"
            select
            SelectProps={{
              multiple: true,
              classes: {
                root: currentNode.features?.length ? classes.selectChips : ''
              },
              renderValue: (selected) => (
                <div className={classes.chips}>
                  {selected.map((value, index) => (
                    <Chip
                      key={`chip-item-${index}`}
                      label={value}
                      className={classes.chip}
                    />
                  ))}
                </div>
              )
            }}
            value={currentNode.features || []}
            className={classes.formFieldForm}
          >
            {features.map((option, index) => (
              <MenuItem key={`menu-item-${index}`} value={option.value}>
                <Checkbox
                  checked={
                    (currentNode.features || []).indexOf(option.value) > -1
                  }
                />
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Button
          variant="contained"
          color="secondary"
          className={classes.addButton}
          onClick={handleOnSubmit}
          disabled={!currentNode.node_type}
        >
          {nodeIndex !== null ? 'Edit node' : 'Add Node'}
        </Button>
      </Grid>
    </Modal>
  )
}

NodesForm.propTypes = {
  nodes: PropTypes.array,
  nodeIndex: PropTypes.number,
  onSubmit: PropTypes.func,
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func
}

export default NodesForm
