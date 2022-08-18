import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactJson from 'react-json-view'
import fileDownload from 'react-file-download'
import { makeStyles } from '@mui/styles'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

import ArrayTextField from '../ArrayTextField'
import { Validator, toCapitalCase } from '../utils'
import { bpSchema, orgSchema, locationSchema } from '../utils/schemas'

import ImagePreview from './ImagePreview'
import NodesForm from './NodesForm'
import NodesList from './NodesList'
import BoxDropzone from './BoxDropzone'
import Styles from './styles'

const initData = {
  candidate_name: '',
  website: '',
  code_of_conduct: '',
  ownership_disclosure: '',
  email: '',
  github_user: [],
  chain_resources: '',
  other_resources: [],
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
    keybase: '',
    telegram: '',
    twitter: '',
    github: '',
    youtube: '',
    facebook: '',
    hive: '',
    reddit: '',
    wechat: '',
    medium: '',
    discord: ''
  }
}

const useStyles = makeStyles(Styles)

const {
  latitudeValidation,
  longitudeValidation,
  countryValidation,
  urlInputValidation,
  validate
} = Validator

const isValidBP = (bp) => {
  return validate(bp, bpSchema)
}

const BPJsonForm = ({ accountName, bpJson, onSubmit }) => {
  const classes = useStyles()
  const [openModal, setOpenModal] = useState(false)
  const [org, setOrg] = useState(initData)
  const [nodes, setNodes] = useState([])
  const [currentNodeIndex, setCurrentNodeIndex] = useState(null)

  const handleOnChange = (key, value, parent) => {
    if (parent === 'org') {
      setOrg({ ...org, [key]: value })
      return
    }

    setOrg({
      ...org,
      [parent]: { ...org[parent], [key]: value }
    })
  }

  const handleOnSubmitNode = (nodes) => {
    setNodes(nodes)
    setCurrentNodeIndex(null)
  }

  const handleOnDeleteNode = (index) => {
    nodes.splice(index, 1)
    setNodes([...nodes])
  }

  const handleOnEditNode = (index) => {
    setCurrentNodeIndex(index)
    setOpenModal(true)
  }

  const getValidBpForm = () => {
    const bp =
    {
      org,
      nodes,
      producer_account_name: accountName
    }

    return (isValidBP(bp) ? JSON.stringify(bp, null, '\t') : null)
  }

  const handleOnDownload = () => {
    const bp = getValidBpForm()

    if (bp) fileDownload(bp, 'bp.json')
  }

  const handleOnSubmit = () => {
    const bp = getValidBpForm()

    !!bp
      ? onSubmit({
        bpJson: bp
      })
      : onSubmit(null)
  }

  const preLoadBP = (bp) => {
    if (bp.org === undefined) {
      throw Error("The BPJSON does not have the information of the organization")
    }
    if (bp.nodes === undefined) {
      throw Error("The BPJSON does not have the list of nodes")
    }

    setOrg(bp ? bp.org : initData)
    setNodes(bp ? bp.nodes : [])
  }

  useEffect(() => {
    setOrg(bpJson ? bpJson.org : initData)
    setNodes(bpJson ? bpJson.nodes : [])
  }, [bpJson])

  return (
    <Grid>
      <Grid className={classes.wrapperRow}>
        <Grid className={classes.wrapper}>
          <Typography variant="h4">BP JSON Generator</Typography>
          <Typography variant="body1">
            A simple way to create and update your node information on chain.
          </Typography>
        </Grid>
        <Grid className={classes.wrapper}>
          <BoxDropzone onSubmit={preLoadBP} />
        </Grid>
      </Grid>

      <Grid className={classes.wrapper}>
        <Typography variant="h5">{`Account Name: ${accountName}`}</Typography>
        <Divider className={classes.divider} />
      </Grid>

      <Grid className={classes.wrapper}>
        <Typography variant="h5">Organization Info</Typography>
        <Divider className={classes.divider} />
        <Grid container spacing={3}>
          <Grid container spacing={3} item>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  handleOnChange('candidate_name', e.target.value, 'org')
                }
                variant="outlined"
                required
                error={!orgSchema.candidate_name.isValid(org.candidate_name)}
                label="Candidate Name"
                value={org.candidate_name || ''}
                helperText={
                  !orgSchema.candidate_name.isValid(org.candidate_name) &&
                  orgSchema.candidate_name.message
                }
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  handleOnChange('website', e.target.value, 'org')
                }
                variant="outlined"
                error={!orgSchema.website.isValid(org.website)}
                label="Website"
                required
                helperText={
                  !orgSchema.website.isValid(org.website) &&
                  orgSchema.website.message
                }
                value={org.website || ''}
                className={classes.formField}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} item>
            <Grid item xs={12} sm={4}>
              <TextField
                onChange={(e) =>
                  handleOnChange('code_of_conduct', e.target.value, 'org')
                }
                variant="outlined"
                label="Code of Conduct"
                required
                error={!orgSchema.code_of_conduct.isValid(org.code_of_conduct)}
                value={org.code_of_conduct || ''}
                helperText={
                  !orgSchema.code_of_conduct.isValid(org.code_of_conduct) &&
                  orgSchema.code_of_conduct.message
                }
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                onChange={(e) =>
                  handleOnChange('ownership_disclosure', e.target.value, 'org')
                }
                variant="outlined"
                error={!orgSchema.ownership_disclosure.isValid(org.ownership_disclosure)}
                label="Ownership disclosure"
                required
                helperText={
                  !orgSchema.ownership_disclosure.isValid(org.ownership_disclosure) &&
                  orgSchema.ownership_disclosure.message
                }
                value={org.ownership_disclosure || ''}
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                onChange={(e) => handleOnChange('email', e.target.value, 'org')}
                variant="outlined"
                required
                error={!orgSchema.email.isValid(org.email)}
                label="Email"
                value={org.email || ''}
                helperText={
                  !orgSchema.email.isValid(org.email) &&
                  orgSchema.email.message
                }
                className={classes.formField}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} item>
            <Grid item xs={12} sm={4}>
              <ArrayTextField
                onChange={(value) =>
                  handleOnChange('github_user', value, 'org')
                }
                variant="outlined"
                label="Github User"
                value={org.github_user || []}
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                onChange={(e) =>
                  handleOnChange('chain_resources', e.target.value, 'org')
                }
                variant="outlined"
                error={!urlInputValidation(org.chain_resources)}
                label="Chain Resources"
                helperText={
                  !urlInputValidation(org.chain_resources) && 'Invalid URL'
                }
                value={org.chain_resources || ''}
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ArrayTextField
                onChange={(value) =>
                  handleOnChange('other_resources', value, 'org')
                }
                variant="outlined"
                error={!urlInputValidation(org.other_resources)}
                label="Other Resources"
                helperText={
                  !urlInputValidation(org.other_resources) && 'Invalid URL'
                }
                value={org.other_resources || []}
                className={classes.formField}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid className={classes.wrapper}>
        <Typography variant="h5">Branding</Typography>
        <Divider className={classes.divider} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Grid>
              <TextField
                onChange={(e) =>
                  handleOnChange('logo_256', e.target.value, 'branding')
                }
                variant="outlined"
                label="Logo 256px"
                error={!urlInputValidation(org.branding.logo_256)}
                value={org.branding.logo_256 || ''}
                helperText={
                  !urlInputValidation(org.branding.logo_256) && 'Invalid URL'
                }
                className={classes.formField}
              />
              <Grid maxWidth={256} maxHeight={256}>
                <ImagePreview
                  url={org.branding.logo_256}
                  label="Logo 256px"
                  isInvalidURL={!urlInputValidation(org.branding.logo_256)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid>
              <TextField
                onChange={(e) =>
                  handleOnChange('logo_1024', e.target.value, 'branding')
                }
                variant="outlined"
                label="Logo 1024px"
                error={!urlInputValidation(org.branding.logo_1024)}
                value={org.branding.logo_1024 || ''}
                helperText={
                  !urlInputValidation(org.branding.logo_1024) && 'Invalid URL'
                }
                className={classes.formField}
              />
              <Grid maxWidth={1024} maxHeight={1024}>
                <ImagePreview
                  url={org.branding.logo_1024}
                  label="Logo 1024px"
                  isInvalidURL={!urlInputValidation(org.branding.logo_1024)}
                /></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid>
              <TextField
                onChange={(e) =>
                  handleOnChange('logo_svg', e.target.value, 'branding')
                }
                variant="outlined"
                label="Logo SVG"
                error={!urlInputValidation(org.branding.logo_svg)}
                value={org.branding.logo_svg || ''}
                helperText={
                  !urlInputValidation(org.branding.logo_svg) && 'Invalid URL'
                }
                className={classes.formField}
              />
              <ImagePreview
                url={org.branding.logo_svg}
                label="Logo SVG"
                isInvalidURL={!urlInputValidation(org.branding.logo_svg)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid className={classes.wrapper}>
        <Typography variant="h5">Location</Typography>
        <Divider className={classes.divider} />
        <Grid container spacing={3}>
          <Grid container spacing={3} item>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  handleOnChange('name', e.target.value, 'location')
                }
                variant="outlined"
                label="Name"
                required
                error={!locationSchema.name.isValid(org.location.name)}
                helperText={
                  !locationSchema.name.isValid(org.location.name) &&
                  locationSchema.name.message
                }
                value={org.location.name || ''}
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  handleOnChange('country', e.target.value.toUpperCase(), 'location')
                }
                variant="outlined"
                label="Country"
                required
                error={!countryValidation(org.location.country)}
                helperText={
                  !countryValidation(org.location.country) &&
                  locationSchema.country.message
                }
                value={org.location.country || ''}
                className={classes.formField}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} item>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  handleOnChange('latitude', Number(e.target.value), 'location')
                }
                variant="outlined"
                type="number"
                label="Latitude"
                error={!latitudeValidation(org.location.latitude)}
                helperText={
                  !latitudeValidation(org.location.latitude) &&
                  locationSchema.latitude.message
                }
                value={org.location.latitude || 0}
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  handleOnChange(
                    'longitude',
                    Number(e.target.value),
                    'location'
                  )
                }
                variant="outlined"
                type="number"
                label="Longitude"
                value={org.location.longitude || 0}
                error={!longitudeValidation(org.location.longitude)}
                helperText={
                  !longitudeValidation(org.location.longitude) &&
                  locationSchema.longitude.message
                }
                className={classes.formField}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid className={classes.wrapper}>
        <Typography variant="h5">Social</Typography>
        <Divider className={classes.divider} />
        <Grid container spacing={3}>
          {Object.keys(org.social).map((key) => (
            <Grid item xs={12} sm={4} key={`social-item-${key}`}>
              <TextField
                onChange={(e) => handleOnChange(key, e.target.value, 'social')}
                variant="outlined"
                label={toCapitalCase(key)}
                value={org.social[key] || ''}
                className={classes.formField}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid className={classes.wrapper}>
        <Typography variant="h5">Node List</Typography>
        <Divider className={classes.divider} />
        <NodesForm
          nodes={nodes}
          nodeIndex={currentNodeIndex}
          onSubmit={handleOnSubmitNode}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {(nodes || []).length ? (
              <NodesList
                nodes={nodes}
                onDelete={handleOnDeleteNode}
                onEdit={handleOnEditNode}
              />
            ) : (
              <Typography variant="body1" align="center">
                Nothing to display
              </Typography>
            )}
          </Grid>
          <Grid container item direction="column" alignItems="center">
            <Button
              variant="contained"
              color="secondary"
              className={classes.btn}
              onClick={() => setOpenModal(true)}
            >
              Add Node
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid className={classes.wrapper}>
        <Typography variant="h5">Preview</Typography>
        <Divider className={classes.divider} />
        <ReactJson
          src={{
            producer_account_name: accountName,
            org: org,
            nodes: nodes
          }}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
          name="BPJson"
          collapsed
        />
      </Grid>

      <Grid className={classes.wrapper}>
        <Grid container direction="row" spacing={1}>
          <Grid
            container
            justifyContent="space-evenly"
            item
            xs={6}
            sm={6}
            md={6}
          >
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={handleOnDownload}
            >
              Download bp.json
            </Button>
          </Grid>
          <Grid
            container
            justifyContent="space-evenly"
            item
            xs={6}
            sm={6}
            md={6}
          >
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={handleOnSubmit}
            >
              Save on chain
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
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
