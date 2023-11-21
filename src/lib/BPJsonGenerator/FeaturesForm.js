import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import Styles from './styles'

const useStyles = makeStyles(Styles)

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
    info: ''
  }
]

const FeaturesForm = ({ currentNode, nodesKeys, handleOnChange }) => {
  const classes = useStyles()

  if (!(nodesKeys[currentNode.node_type]?.indexOf('features') > -1)) {
    return <></>
  }

  return (
    <div className={classes.wrapperForm}>
      <Typography className={classes.sectionTitle} variant="h5">
        Features
      </Typography>
      <Divider className={classes.divider} />
      <TextField
        onChange={handleOnChange}
        variant="outlined"
        label="Node Features"
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
              checked={(currentNode.features || []).indexOf(option.value) > -1}
            />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </TextField>
    </div>
  )
}

FeaturesForm.propTypes = {
  currentNode: PropTypes.object,
  nodesKeys: PropTypes.object,
  handleOnChange: PropTypes.func
}

export default FeaturesForm
