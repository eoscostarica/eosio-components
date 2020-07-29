import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactJson from 'react-json-view'
import fileDownload from 'react-file-download'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

import { urlInputValidation, formInputValidation } from '../../utils/validation'

import ImagePreview from './ImagePreview'
import NodesForm from './NodesForm'

const initData = {
  candidate_name: '',
  website: '',
  code_of_conduct: '',
  email: '',
  branding: {
    logo_256: '',
    logo_1024: '',
    logo_svg: ''
  },
  location: {
    name: '',
    country: '',
    latitude: 0,
    longitude: 0
  },
  social: {
    steemit: '',
    twitter: '',
    facebook: '',
    github: '',
    reddit: '',
    keybase: '',
    telegram: '',
    webchat: ''
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& h2': {
      textAlign: 'center',
      fontSize: 25
    },
    '& h4': {
      textAlign: 'center'
    }
  },
  org: {
    width: '100%',
    margin: theme.spacing(2, 0),
    '& > .MuiTextField-root': {
      width: '100%',
      marginTop: theme.spacing(2)
    }
  },
  leftBoxOrg: {
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
  rightBoxOrg: {
    display: 'flex',
    flexDirection: 'column',
    '& > .MuiTextField-root': {
      width: '100%',
      marginTop: theme.spacing(2)
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      '& > .MuiTextField-root': {
        width: '48%',
        marginTop: theme.spacing(2)
      }
    }
  },
  branding: {
    width: '100%',
    margin: theme.spacing(2, 0)
  },
  brandBox: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTextField-root': {
      width: '100%',
      marginTop: theme.spacing(2)
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      '& $imagePreviewBox': {
        width: '32%'
      }
    }
  },
  location: {
    width: '100%',
    margin: theme.spacing(2, 0),
    '& > .MuiTextField-root': {
      width: '100%',
      marginTop: theme.spacing(2)
    }
  },
  leftBoxLocation: {
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
  rightBoxLocation: {
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
  social: {
    width: '100%',
    margin: theme.spacing(2, 0)
  },
  socialBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '& > .MuiTextField-root': {
      width: '100%',
      marginTop: theme.spacing(2)
    },
    [theme.breakpoints.up('md')]: {
      width: '32%'
    }
  },
  socialBoxWrapper: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  },
  imagePreviewBox: {
    display: 'flex',
    flexDirection: 'column'
  },
  submitButtonBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  addNewNode: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      padding: '0 25%'
    }
  },
  addNodeBtn: {
    height: 40,
    width: 200,
    marginTop: theme.spacing(1)
  },
  submitButton: {
    height: 40,
    marginTop: theme.spacing(4),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 200
    }
  },
  nodeList: {
    width: '100%',
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 5)
    }
  },
  nodeListItem: {
    width: '100%'
  },
  lgBox: {
    padding: 0,
    width: '100%'
  },
  lgBoxRight: {
    padding: 0,
    width: '100%'
  },
  jsonView: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(2, 0),
    '& h2': {
      marginBottom: theme.spacing(2)
    }
  }
}))

const BPJsonForm = ({ accountName, bpJson, onSubmit }) => {
  const classes = useStyles()
  const [openModal, setOpenModal] = useState(false)
  const [producerData, setProducerData] = useState(initData)
  const [nodeData, setNodeData] = useState()
  const [editNode, setEditNode] = useState(null)
  const [requiredFieldsValidation, setRequiredFieldsValidation] = useState({
    candidate_name: { isError: false, message: 'Candidate Name is required' },
    email: { isError: false, message: 'Email is required' },
    website: { isError: false, message: 'Website is required' },
    code_of_conduct: { isError: false, message: 'Code of Conduct is required' }
  })

  const handleOnChange = (key, value, parent) => {
    if (parent === 'org') {
      setProducerData({ ...producerData, [key]: value })
      return
    }
    setProducerData({
      ...producerData,
      [parent]: { ...producerData[parent], [key]: value }
    })
  }

  const handleOnDelete = (node) => {
    const nodesFiltered = nodeData.filter(
      ({ node_type: nodeType }) => nodeType !== node
    )

    setNodeData(nodesFiltered)
  }

  const handleOnChangeBranding = (key, value) => {
    setProducerData({
      ...producerData,
      branding: { ...producerData.branding, [key]: value }
    })
  }

  const handleOnSubmit = () => {
    const { formValidated, isValidForm } = formInputValidation(producerData)

    setRequiredFieldsValidation(formValidated)

    if (!isValidForm) return

    const producerJson = JSON.stringify(
      {
        producer_account_name: accountName,
        org: producerData,
        nodes: nodeData
      },
      null,
      '\t'
    )

    onSubmit(accountName, producerJson)
  }

  useEffect(() => {
    setProducerData(bpJson ? bpJson.org : initData)
    setNodeData(bpJson ? bpJson.nodes : [])
  }, [bpJson])

  return (
    <Box>
      <Typography variant='h4'>BP JSON Generator</Typography>
      <Typography variant='body1'>
        A simple way to create and update your node information on chain.
      </Typography>
      <Box height={30} />
      {accountName && (
        <Typography variant='h4'>{`Account Name: ${accountName}`}</Typography>
      )}
      <form className={classes.root} noValidate autoComplete='off'>
        <Box className={classes.lgBox}>
          <Box className={classes.org}>
            <Typography variant='h2'>Organization Info</Typography>
            <Divider />
            <Box className={classes.leftBoxOrg}>
              <TextField
                onChange={(e) =>
                  handleOnChange('candidate_name', e.target.value, 'org')
                }
                variant='outlined'
                required
                id='standard-basic'
                error={requiredFieldsValidation.candidate_name.isError}
                label='Candidate Name'
                value={producerData.candidate_name || ''}
                helperText={
                  requiredFieldsValidation.candidate_name.isError &&
                  requiredFieldsValidation.candidate_name.message
                }
              />
              <TextField
                onChange={(e) => handleOnChange('email', e.target.value, 'org')}
                variant='outlined'
                required
                id='standard-basic'
                error={requiredFieldsValidation.email.isError}
                label='Email'
                value={producerData.email || ''}
                helperText={
                  requiredFieldsValidation.email.isError &&
                  requiredFieldsValidation.email.message
                }
              />
            </Box>

            <Box className={classes.rightBoxOrg}>
              <TextField
                onChange={(e) =>
                  handleOnChange('website', e.target.value, 'org')
                }
                variant='outlined'
                required
                id='standard-basic'
                error={requiredFieldsValidation.website.isError}
                label='Website'
                value={producerData.website || ''}
                helperText={
                  requiredFieldsValidation.website.isError &&
                  requiredFieldsValidation.website.message
                }
              />
              <TextField
                onChange={(e) =>
                  handleOnChange('code_of_conduct', e.target.value, 'org')
                }
                variant='outlined'
                required
                id='standard-basic'
                error={requiredFieldsValidation.code_of_conduct.isError}
                label='Code of Conduct'
                value={producerData.code_of_conduct || ''}
                helperText={
                  requiredFieldsValidation.code_of_conduct.isError &&
                  requiredFieldsValidation.code_of_conduct.message
                }
              />
            </Box>
          </Box>

          <Box className={classes.branding}>
            <Typography variant='h2'>Branding</Typography>
            <Divider />
            <Box className={classes.brandBox}>
              <Box className={classes.imagePreviewBox}>
                <TextField
                  onChange={(e) =>
                    handleOnChangeBranding('logo_256', e.target.value)
                  }
                  variant='outlined'
                  id='standard-basic'
                  label='Logo 256px'
                  value={producerData.branding.logo_256 || ''}
                  error={
                    producerData.branding.logo_256.length &&
                    !urlInputValidation(producerData.branding.logo_256)
                  }
                />
                <ImagePreview
                  url={producerData.branding.logo_256}
                  label='Logo 256px'
                  isInvalidURL={
                    !urlInputValidation(producerData.branding.logo_256)
                  }
                />
              </Box>
              <Box className={classes.imagePreviewBox}>
                <TextField
                  onChange={(e) =>
                    handleOnChangeBranding('logo_1024', e.target.value)
                  }
                  variant='outlined'
                  id='standard-basic'
                  label='Logo 1024px'
                  error={
                    producerData.branding.logo_1024.length &&
                    !urlInputValidation(producerData.branding.logo_1024)
                  }
                  value={producerData.branding.logo_1024 || ''}
                />
                <ImagePreview
                  url={producerData.branding.logo_1024}
                  label='Logo 1024px'
                  isInvalidURL={
                    !urlInputValidation(producerData.branding.logo_1024)
                  }
                />
              </Box>
              <Box className={classes.imagePreviewBox}>
                <TextField
                  onChange={(e) =>
                    handleOnChangeBranding('logo_svg', e.target.value)
                  }
                  variant='outlined'
                  id='standard-basic'
                  label='Logo SVG'
                  error={
                    producerData.branding.logo_svg.length &&
                    !urlInputValidation(producerData.branding.logo_svg)
                  }
                  value={producerData.branding.logo_svg || ''}
                />
                <ImagePreview
                  url={producerData.branding.logo_svg}
                  label='Logo SVG'
                  isInvalidURL={
                    !urlInputValidation(producerData.branding.logo_svg)
                  }
                />
              </Box>
            </Box>
          </Box>

          <Box className={classes.location}>
            <Typography variant='h2'>Location</Typography>
            <Divider />
            <Box className={classes.leftBoxLocation}>
              <TextField
                onChange={(e) =>
                  handleOnChange('name', e.target.value, 'location')
                }
                variant='outlined'
                id='standard-basic'
                value={producerData.location.name || ''}
                label='Name'
              />
              <TextField
                onChange={(e) =>
                  handleOnChange('country', e.target.value, 'location')
                }
                variant='outlined'
                id='standard-basic'
                value={producerData.location.country || ''}
                label='Country'
              />
            </Box>
            <Box className={classes.rightBoxLocation}>
              <TextField
                onChange={(e) =>
                  handleOnChange('latitude', e.target.value, 'location')
                }
                variant='outlined'
                id='standard-basic'
                value={producerData.location.latitude || ''}
                label='Latitude'
                type='number'
              />
              <TextField
                onChange={(e) =>
                  handleOnChange('longitude', e.target.value, 'location')
                }
                variant='outlined'
                id='standard-basic'
                value={producerData.location.longitude || ''}
                label='Longitude'
                type='number'
              />
            </Box>
          </Box>
        </Box>
        <Box className={classes.lgBoxRight}>
          <Box className={classes.social}>
            <Typography variant='h2'>Social</Typography>
            <Divider />
            <Box className={classes.socialBoxWrapper}>
              <Box className={classes.socialBox}>
                <TextField
                  onChange={(e) =>
                    handleOnChange('github', e.target.value, 'social')
                  }
                  variant='outlined'
                  id='standard-basic'
                  label='Github'
                  value={producerData.social.github || ''}
                />
                <TextField
                  onChange={(e) =>
                    handleOnChange('twitter', e.target.value, 'social')
                  }
                  variant='outlined'
                  id='standard-basic'
                  label='Twitter'
                  value={producerData.social.twitter || ''}
                />
                <TextField
                  onChange={(e) =>
                    handleOnChange('youtube', e.target.value, 'social')
                  }
                  variant='outlined'
                  id='standard-basic'
                  label='Youtube'
                  value={producerData.social.youtube || ''}
                />
              </Box>
              <Box className={classes.socialBox}>
                <TextField
                  onChange={(e) =>
                    handleOnChange('facebook', e.target.value, 'social')
                  }
                  variant='outlined'
                  id='standard-basic'
                  label='facebook'
                  value={producerData.social.facebook || ''}
                />
                <TextField
                  onChange={(e) =>
                    handleOnChange('telegram', e.target.value, 'social')
                  }
                  variant='outlined'
                  id='standard-basic'
                  label='Telegram'
                  value={producerData.social.telegram || ''}
                />
                <TextField
                  onChange={(e) =>
                    handleOnChange('steemit', e.target.value, 'social')
                  }
                  variant='outlined'
                  id='standard-basic'
                  label='Steemit'
                  value={producerData.social.steemit || ''}
                />
              </Box>
              <Box className={classes.socialBox}>
                <TextField
                  onChange={(e) =>
                    handleOnChange('reddit', e.target.value, 'social')
                  }
                  variant='outlined'
                  id='standard-basic'
                  label='Reddit'
                  value={producerData.social.reddit || ''}
                />
                <TextField
                  onChange={(e) =>
                    handleOnChange('keybase', e.target.value, 'social')
                  }
                  variant='outlined'
                  id='standard-basic'
                  label='Keybase'
                  value={producerData.social.keybase || ''}
                />
                <TextField
                  onChange={(e) =>
                    handleOnChange('webchat', e.target.value, 'social')
                  }
                  variant='outlined'
                  id='standard-basic'
                  label='Webchat'
                  value={producerData.social.webchat || ''}
                />
              </Box>
            </Box>
          </Box>
          <Box>
            <NodesForm
              nodes={nodeData}
              setNode={setNodeData}
              openModal={openModal}
              setOpenModal={setOpenModal}
              editNode={editNode}
              setEditNode={setEditNode}
            />

            <Box className={classes.addNewNode}>
              <Typography variant='h2'>Node List</Typography>
              <Divider />
              {(nodeData || []).length ? (
                <List className={classes.nodeList}>
                  {nodeData.map((node, index) => {
                    return (
                      <div
                        className={classes.nodeListItem}
                        key={`bpjosn-node-${index}`}
                      >
                        <ListItem>
                          <ListItemText
                            primary={node.node_type}
                            secondary={node.location.name}
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge='end'
                              aria-label='delete'
                              onClick={() => {
                                setEditNode(node)
                                setOpenModal(true)
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              edge='end'
                              aria-label='delete'
                              onClick={() => handleOnDelete(node.node_type)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                      </div>
                    )
                  })}
                </List>
              ) : (
                <Typography variant='body1' align='center'>
                  Nothing to display
                </Typography>
              )}

              <Button
                variant='contained'
                color='secondary'
                className={classes.addNodeBtn}
                onClick={() => setOpenModal(true)}
              >
                Add Node
              </Button>
            </Box>

            {onSubmit && (
              <Box className={classes.submitButtonBox}>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.submitButton}
                  onClick={handleOnSubmit}
                >
                  Submit
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </form>
      <Box className={classes.jsonView}>
        <Typography variant='h4'>Block Producer JSON preview</Typography>

        <ReactJson
          src={{
            producer_account_name: accountName,
            org: producerData,
            nodes: nodeData
          }}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
          name='BPJson'
          collapsed
        />
        <Button
          variant='contained'
          color='secondary'
          className={classes.submitButton}
          onClick={() =>
            fileDownload(
              JSON.stringify(
                {
                  producer_account_name: accountName,
                  org: producerData,
                  nodes: nodeData
                },
                null,
                '\t'
              ),
              'bp.json'
            )
          }
        >
          Download bp.json
        </Button>
      </Box>
    </Box>
  )
}

BPJsonForm.propTypes = {
  accountName: PropTypes.string,
  bpJson: PropTypes.any,
  onSubmit: PropTypes.func
}

BPJsonForm.defaultProps = {
  bpJson: {}
}

export default BPJsonForm
