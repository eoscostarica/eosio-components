import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'

import { Validator, toCapitalCase, NODE_EXTRA_KEYS } from '../utils'
import { nodeSchema, locationSchema } from '../utils/schemas'

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

const { latitudeValidation, longitudeValidation, countryValidation, validate } =
  Validator

const isValidNode = (node) => {
  return validate(node, nodeSchema)
}

const NodesForm = ({
  nodes,
  nodesTypes,
  additionalNodesTypes,
  nodeIndex,
  onSubmit,
  openModal,
  setOpenModal
}) => {
  const classes = useStyles()
  const [currentNode, setCurrentNode] = useState(defaultNode)
  const nodesKeys = {
    ...(!Array.isArray(additionalNodesTypes) && additionalNodesTypes),
    ...NODE_EXTRA_KEYS
  }

  const handleOnChange = (key, value) => {
    setCurrentNode({ ...currentNode, [key]: value })
  }

  const handleOnChangeLocation = (key, value) => {
    setCurrentNode({
      ...currentNode,
      location: { ...currentNode.location, [key]: value }
    })
  }

  const handleOnChangeFeatures = (_event, features) => {
    setCurrentNode((prevValue) => {
      if (!features?.length) return { ...prevValue, features: [] }

      const prevFeatures = prevValue?.features || []
      const newFeature = features[features.length - 1]
      const newValue = (newFeature?.label || newFeature)?.toLowerCase()
      const index = prevFeatures.indexOf(newValue)

      if (index >= 0) {
        return {
          ...prevValue,
          features: [
            ...prevFeatures.slice(0, index),
            ...prevFeatures.slice(index + 1)
          ]
        }
      } else {
        return {
          ...prevValue,
          features: [...prevFeatures, newValue]
        }
      }
    })
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
    if (!isValidNode(currentNode)) return

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
      if (obj[key]) delete obj[key]
    })
  }

  const handleOnChangeNodeType = (key, value) => {
    const newNode = JSON.parse(JSON.stringify(currentNode))

    deleteObjectKeys(newNode, nodesKeys[newNode.node_type] ?? [])

    setCurrentNode({ ...newNode, [key]: value })
  }

  useEffect(() => {
    setCurrentNode(nodes[nodeIndex] || defaultNode)
  }, [nodes, nodeIndex])

  return (
    <Modal openModal={openModal} setOpenModal={(value) => setOpenModal(value)}>
      <Grid container justify="center" className={classes.nodes}>
        <div className={classes.wrapperForm}>
          <Typography className={classes.sectionTitle} variant="h5">
            Nodes
          </Typography>
          <Divider className={classes.divider} />
          <div className={classes.nodeTypeSelector}>
            <TextField
              onChange={(e) =>
                handleOnChangeNodeType('node_type', e.target.value)
              }
              variant="outlined"
              label="Node Type"
              select
              value={currentNode.node_type}
              error={
                !Object.values(nodesTypes || {}).includes(currentNode.node_type)
              }
              helperText={
                !Object.values(nodesTypes || {}).includes(
                  currentNode.node_type
                ) && 'Select a valid node type'
              }
            >
              {Object.values(nodesTypes).map((type) => (
                <MenuItem key={type} value={type}>
                  {toCapitalCase(type)}
                </MenuItem>
              ))}
            </TextField>

            <div>
              <Typography variant="body1" align="center">
                Full
              </Typography>
              <Checkbox
                onClick={(e) => handleOnChange('full', e.target.checked)}
                checked={currentNode.full}
              />
            </div>
          </div>
        </div>

        <div className={classes.wrapperForm}>
          <Typography className={classes.sectionTitle} variant="h5">
            Location
          </Typography>
          <Divider className={classes.divider} />

          <Grid className={classes.locationWrapper}>
            <TextField
              onChange={(e) => handleOnChangeLocation('name', e.target.value)}
              variant="outlined"
              label="Name"
              required
              error={!locationSchema.name.isValid(currentNode.location.name)}
              helperText={
                !locationSchema.name.isValid(currentNode.location.name) &&
                locationSchema.name.message
              }
              value={currentNode.location.name}
              className={classes.formFieldForm}
            />
            <TextField
              onChange={(e) =>
                handleOnChangeLocation('country', e.target.value.toUpperCase())
              }
              variant="outlined"
              label="Country"
              required
              error={!countryValidation(currentNode.location.country)}
              helperText={
                !countryValidation(currentNode.location.country) &&
                locationSchema.country.message
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
                !latitudeValidation(currentNode.location.latitude) &&
                locationSchema.latitude.message
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
                !longitudeValidation(currentNode.location.longitude) &&
                locationSchema.longitude.message
              }
              value={currentNode.location.longitude}
              className={classes.formFieldForm}
            />
          </Grid>
        </div>

        <EndpointsForm
          currentNode={currentNode}
          nodesKeys={nodesKeys}
          handleOnChange={handleOnChange}
        />

        <FeaturesForm
          currentNode={currentNode}
          nodesKeys={nodesKeys}
          handleOnChange={handleOnChangeFeatures}
        />

        <Grid container item direction="column" alignItems="center">
          <Button
            variant="contained"
            color="secondary"
            className={classes.addButton}
            onClick={handleOnSubmit}
            disabled={
              !Object.values(nodesTypes || {}).includes(currentNode.node_type)
            }
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
  nodesTypes: PropTypes.object,
  additionalNodesTypes: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  nodeIndex: PropTypes.number,
  onSubmit: PropTypes.func,
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func
}

export default NodesForm
