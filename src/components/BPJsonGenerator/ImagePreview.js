import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  bar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.87)',
    padding: 0,
    '& span': {
      fontSize: 12.1,
      fontWeight: 600,
      lineHeight: 1.32,
      letterSpacing: '2px',
      color: theme.palette.secondary.main
    }
  },
  media: {
    width: 150,
    [theme.breakpoints.up('sm')]: {
      height: 150
    },
    [theme.breakpoints.up('md')]: {
      width: '50%'
    }
  },
  listPreview: {
    marginBottom: theme.spacing(3)
  },
  center: {
    textAlign: 'center'
  }
}))

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
        timeout='auto'
        unmountOnExit
        classes={{ wrapperInner: classes.center }}
      >
        <img className={classes.media} src={url} alt='node entity logo' />
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
