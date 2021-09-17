import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

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
