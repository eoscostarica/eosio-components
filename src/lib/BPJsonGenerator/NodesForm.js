import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'

import { Validator, toCapitalCase, NODE_TYPES, NODE_EXTRA_KEYS } from '../utils'

import Styles from './styles'
import Modal from './Modal'
import EndpointsForm from './EndpointsForm'
import FeaturesForm from './FeaturesForm'

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
    latitudeValidation,
    longitudeValidation,
    countryValidation,
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

  const deleteObjectKeys = (obj, keys) => {
    keys.forEach((key) => {
      if (obj[key])
        delete obj[key]
    })
  }

  const handleOnChangeNodeType = (key, value) => {

    const newNode = JSON.parse(JSON.stringify(currentNode))

    deleteObjectKeys(newNode, NODE_EXTRA_KEYS[newNode.node_type] ?? [])

    setCurrentNode({ ...newNode, [key]: value })

  }

  useEffect(() => {
    setCurrentNode(nodes[nodeIndex] || defaultNode)
  }, [nodes, nodeIndex])

  return (
    <Modal openModal={openModal} setOpenModal={(value) => setOpenModal(value)}>
      <Grid container justify="center" className={classes.nodes}>
        <Grid>
          <Typography className={classes.sectionTitle} variant="h5">
            Nodes
          </Typography>

          <Grid className={classes.nodeWrapper}>
            <TextField
              onChange={(e) => handleOnChangeNodeType('node_type', e.target.value)}
              variant="outlined"
              label="Node Type"
              select
              value={currentNode.node_type}
              className={classes.formFieldForm}
            >
              {Object.values(NODE_TYPES).map((type) => (
                <MenuItem key={type} value={type}>
                  {toCapitalCase(type)}
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
          <EndpointsForm currentNode={currentNode} handleOnChange={handleOnChange} />
        </Grid>

        <Grid className={classes.wrapperForm}>
          <FeaturesForm currentNode={currentNode} handleOnChange={handleOnChangeFeatures} />
        </Grid>

        <Grid container item direction="column" alignItems="center">
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
