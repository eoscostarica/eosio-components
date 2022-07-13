import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import Styles from './styles'

const useStyles = makeStyles(Styles)

const ImagePreview = ({ url, label, isInvalidURL }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  if (isInvalidURL || !url.length) return null

  return (
    <List className={classes.listPreview}>
      <ListItem button onClick={handleClick} className={classes.bar}>
        <ListItemText primary={`${label} Preview`} />
        {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </ListItem>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        classes={{ wrapperInner: classes.center }}
      >
        <img className={classes.media} src={url} alt="node entity logo" />
      </Collapse>
    </List>
  )
}

ImagePreview.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string,
  isInvalidURL: PropTypes.bool
}

export default ImagePreview
