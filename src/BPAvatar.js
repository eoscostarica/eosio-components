import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import getRgbColorsFromHex from './utils/getRgbColorsFromHex'

const useStyles = makeStyles({
  bpAvatar: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5,
    alignItems: 'center'
  },
  avatar: {
    margin: 5,
    width: 10,
    height: 10,
    fontSize: 1,
    color: '#111',
    backgroundColor: ({ backgroundColor }) => backgroundColor.hex
  }
})

const BPAvatar = ({ name }) => {
  const classes = useStyles({
    backgroundColor: getRgbColorsFromHex(name)
  })

  return (
    <Grid className={classes.bpAvatar}>
      <Avatar className={classes.avatar}>.</Avatar>
      <Typography>{name}</Typography>
    </Grid>
  )
}

BPAvatar.propTypes = {
  name: PropTypes.string
}

BPAvatar.defaultProps = {
  name: 'userdefault1'
}

export default BPAvatar
