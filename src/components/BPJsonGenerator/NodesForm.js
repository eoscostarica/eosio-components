import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

import Modal from './Modal'

const values = [
  {
    label: 'Producer',
    value: 'producer'
  },
  {
    label: 'Full',
    value: 'full'
  },
  {
    label: 'Seed',
    value: 'seed'
  }
]

const useStyles = makeStyles((theme) => ({
  nodes: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      alignItems: 'center'
    }
  },
  boxWrapper: {
    width: '100%',
    margin: theme.spacing(2, 0),
    display: 'flex',
    flexDirection: 'column',
    '& > .MuiTextField-root': {
      width: '100%',
      marginTop: theme.spacing(2)
    },
    '& .MuiList-root': {
      '& p': {
        textAlign: 'left !important'
      }
    }
  },
  locationNode: {
    width: '100%',
    margin: theme.spacing(2, 0),
    '& > .MuiTextField-root': {
      width: '100%',
      marginTop: theme.spacing(2)
    }
  },
  leftBoxLocationNode: {
    display: 'flex',
    flexDirection: 'column',
    '& > .MuiTextField-root': {
      width: '100%',
      marginTop: theme.spacing(2)
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      '& > .MuiTextField-root': {
        width: '48%',
        marginTop: theme.spacing(2)
      }
    }
  },
  rightBoxLocationNode: {
    display: 'flex',
    flexDirection: 'column',
    '& > .MuiTextField-root': {
      width: '100%',
      marginTop: theme.spacing(2)
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      '& > .MuiTextField-root': {
        width: '48%',
        marginTop: theme.spacing(2)
      }
    }
  },
  hideItem: {
    display: 'none'
  },
  showItem: {
    display: 'flex'
  },
  addButton: {
    height: 40,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 300
    }
  }
}))

const NodesForm = ({
  onChange,
  nodes,
  setNode,
  openModal,
  setOpenModal,
  editNode,
  setEditNode
}) => {
  const classes = useStyles()
  const [producerNodeData, setProducerNodeData] = useState({
    location: {
      name: '',
      country: '',
      latitude: null,
      longitude: null
    },
    node_type: '',
    p2p_endpoint: '',
    api_endpoint: '',
    ssl_endpoint: ''
  })

  const handleOnChange = (key, value) => {
    setProducerNodeData({ ...producerNodeData, [key]: value })
  }

  const handleOnChangeLocation = (key, value, parent) => {
    setProducerNodeData({
      ...producerNodeData,
      [parent]: { ...producerNodeData[parent], [key]: value }
    })
  }

  const handleOnClick = () => {
    setNode([...nodes, producerNodeData])
    setProducerNodeData({
      location: {
        name: '',
        country: '',
        latitude: null,
        longitude: null
      },
      node_type: '',
      p2p_endpoint: '',
      api_endpoint: '',
      ssl_endpoint: ''
    })
    setOpenModal(false)
  }

  useEffect(() => {
    editNode && setProducerNodeData(editNode)
  }, [editNode])

  return (
    <Modal
      openModal={openModal}
      setOpenModal={(value) => {
        setOpenModal(value)
        setProducerNodeData({
          location: {
            name: '',
            country: '',
            latitude: null,
            longitude: null
          },
          node_type: '',
          p2p_endpoint: '',
          api_endpoint: '',
          ssl_endpoint: ''
        })
      }}
    >
      <Box className={classes.nodes}>
        <Box className={classes.boxWrapper}>
          <Typography variant='h5'>Nodes</Typography>
          <TextField
            onChange={(e) => handleOnChange('node_type', e.target.value)}
            variant='outlined'
            id='standard-basic'
            label='Node Type'
            select
            SelectProps
            value={producerNodeData.node_type}
          >
            {values.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Box className={classes.locationNode}>
            <Typography variant='h5'>Location</Typography>
            <Box className={classes.leftBoxLocationNode}>
              <TextField
                onChange={(e) =>
                  handleOnChangeLocation('name', e.target.value, 'location')
                }
                variant='outlined'
                disabled={!producerNodeData.node_type}
                id='standard-basic'
                label='Name'
                value={producerNodeData.location.name}
              />
              <TextField
                onChange={(e) =>
                  handleOnChangeLocation('country', e.target.value, 'location')
                }
                variant='outlined'
                disabled={!producerNodeData.node_type}
                id='standard-basic'
                label='Country'
                value={producerNodeData.location.country}
              />
            </Box>
            <Box className={classes.rightBoxLocationNode}>
              <TextField
                onChange={(e) =>
                  handleOnChangeLocation('latitude', e.target.value, 'location')
                }
                variant='outlined'
                disabled={!producerNodeData.node_type}
                id='standard-basic'
                label='Latitude'
                type='number'
                value={producerNodeData.location.latitude}
              />
              <TextField
                onChange={(e) =>
                  handleOnChangeLocation(
                    'longitude',
                    e.target.value,
                    'location'
                  )
                }
                variant='outlined'
                disabled={!producerNodeData.node_type}
                id='standard-basic'
                label='Longitude'
                type='number'
                value={producerNodeData.location.longitude}
              />
            </Box>
          </Box>
          <TextField
            onChange={(e) => handleOnChange('p2p_endpoint', e.target.value)}
            variant='outlined'
            className={clsx(classes.hideItem, {
              [classes.showItem]: producerNodeData.node_type === 'seed'
            })}
            id='standard-basic'
            label='P2P Endpoint'
            value=''
          />
          <TextField
            onChange={(e) => handleOnChange('bnet_endpoint', e.target.value)}
            variant='outlined'
            className={clsx(classes.hideItem, {
              [classes.showItem]: producerNodeData.node_type === 'full'
            })}
            id='standard-basic'
            label='BNET Endpoint'
            value=''
          />
          <TextField
            onChange={(e) => handleOnChange('api_endpoint', e.target.value)}
            variant='outlined'
            className={clsx(classes.hideItem, {
              [classes.showItem]: producerNodeData.node_type === 'full'
            })}
            id='standard-basic'
            label='API Endpoint'
            value=''
          />
          <TextField
            onChange={(e) => handleOnChange('ssl_endpoint', e.target.value)}
            variant='outlined'
            className={clsx(classes.hideItem, {
              [classes.showItem]: producerNodeData.node_type === 'full'
            })}
            id='standard-basic'
            label='SSL Endpoint'
            value=''
          />
        </Box>

        <Button
          variant='contained'
          color='secondary'
          className={classes.addButton}
          onClick={handleOnClick}
        >
          Add Node
        </Button>
      </Box>
    </Modal>
  )
}

NodesForm.propTypes = {
  onChange: PropTypes.func,
  nodes: PropTypes.array,
  setNode: PropTypes.func,
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
  editNode: PropTypes.any,
  setEditNode: PropTypes.func
}

export default NodesForm
