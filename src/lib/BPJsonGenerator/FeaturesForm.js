import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { NODE_FEATURES } from '../utils'

import Styles from './styles'

const useStyles = makeStyles(Styles)

const filter = createFilterOptions()

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
      <Autocomplete
        multiple
        variant="outlined"
        options={NODE_FEATURES}
        onChange={handleOnChange}
        value={currentNode.features || []}
        defaultValue={currentNode.features || []}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)

          if (params.inputValue !== '') {
            filtered.push({
              label: params.inputValue,
              value: params.inputValue,
              info: ''
            })
          }

          return filtered
        }}
        getOptionLabel={(option) => {
          if (typeof option === 'string') return option

          if (option.inputValue) return option.inputValue

          return option.label
        }}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Node Features" />
        )}
      />
    </div>
  )
}

FeaturesForm.propTypes = {
  currentNode: PropTypes.object,
  nodesKeys: PropTypes.object,
  handleOnChange: PropTypes.func
}

export default FeaturesForm
