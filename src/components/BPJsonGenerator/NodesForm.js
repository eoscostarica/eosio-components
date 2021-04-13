import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'

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
  }
]

const defaultNode = {
  location: {
    name: '',
    country: '',
    latitude: null,
    longitude: null
  },
  node_type: '',
  p2p_endpoint: '',
  api_endpoint: '',
  ssl_endpoint: '',
  features: []
}

const useStyles = makeStyles((theme) => ({
  nodes: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  locationWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      '& .MuiFormControl-root': {
        width: '48%'
      }
    }
  },
  sectionTitle: {
    marginBottom: theme.spacing(2)
  },
  formField: {
    marginBottom: theme.spacing(2)
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(1)
  },
  chip: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  selectChips: {
    paddingBottom: 0
  },
  addButton: {
    height: 40,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 300
    }
  }
}))

const NodesForm = ({ nodes, nodeIndex, onSubmit, openModal, setOpenModal }) => {
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

  const handleOnSubmit = () => {
    if (nodeIndex !== null) {
      const newNodes = [...nodes]
      newNodes[nodeIndex] = currentNode
      onSubmit(newNodes)
    } else {
      onSubmit([...nodes, currentNode])
    }

    setCurrentNode(defaultNode)
    setOpenModal(false)
  }

  useEffect(() => {
    setCurrentNode(nodes[nodeIndex] || defaultNode)
  }, [nodes, nodeIndex])

  console.log(nodes)

  return (
    <Modal openModal={openModal} setOpenModal={(value) => setOpenModal(value)}>
      <Box className={classes.nodes}>
        <Box className={classes.wrapper}>
          <Typography className={classes.sectionTitle} variant="h5">
            Nodes
          </Typography>

          <TextField
            onChange={(e) => handleOnChange('node_type', e.target.value)}
            variant="outlined"
            label="Node Type"
            select
            value={currentNode.node_type}
            className={classes.formField}
          >
            {nodeTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box className={classes.wrapper}>
          <Typography className={classes.sectionTitle} variant="h5">
            Location
          </Typography>

          <Box className={classes.locationWrapper}>
            <TextField
              onChange={(e) => handleOnChangeLocation('name', e.target.value)}
              variant="outlined"
              label="Name"
              value={currentNode.location.name}
              className={classes.formField}
            />
            <TextField
              onChange={(e) =>
                handleOnChangeLocation('country', e.target.value)
              }
              variant="outlined"
              label="Country"
              value={currentNode.location.country}
              className={classes.formField}
            />
            <TextField
              onChange={(e) =>
                handleOnChangeLocation('latitude', Number(e.target.value))
              }
              variant="outlined"
              label="Latitude"
              type="number"
              value={currentNode.location.latitude || ''}
              className={classes.formField}
            />
            <TextField
              onChange={(e) =>
                handleOnChangeLocation('longitude', Number(e.target.value))
              }
              variant="outlined"
              label="Longitude"
              type="number"
              value={currentNode.location.longitude}
              className={classes.formField}
            />
          </Box>
        </Box>

        <Box className={classes.wrapper}>
          <Typography className={classes.sectionTitle} variant="h5">
            Endpoints
          </Typography>

          <TextField
            onChange={(e) => handleOnChange('p2p_endpoint', e.target.value)}
            variant="outlined"
            label="P2P Endpoint"
            value={currentNode.p2p_endpoint || ''}
            className={classes.formField}
          />

          <TextField
            onChange={(e) => handleOnChange('api_endpoint', e.target.value)}
            variant="outlined"
            label="API Endpoint"
            value={currentNode.api_endpoint || ''}
            className={classes.formField}
          />

          <TextField
            onChange={(e) => handleOnChange('ssl_endpoint', e.target.value)}
            variant="outlined"
            label="SSL Endpoint"
            value={currentNode.ssl_endpoint || ''}
            className={classes.formField}
          />
        </Box>

        <Box className={classes.wrapper}>
          <Typography className={classes.sectionTitle} variant="h5">
            Features
          </Typography>

          <TextField
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
            className={classes.formField}
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
        </Box>

        <Button
          variant="contained"
          color="secondary"
          className={classes.addButton}
          onClick={handleOnSubmit}
          disabled={!currentNode.node_type}
        >
          {nodeIndex !== null ? 'Edit node' : 'Add Node'}
        </Button>
      </Box>
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
