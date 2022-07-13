import React from 'react'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { getColorHashByString } from '../utils/get-rgb-colors-from-hex'

const useStyles = makeStyles({
  avatar: {
    margin: 5,
    width: 10,
    height: 10,
    fontSize: 1,
    color: '#111',
    backgroundColor: ({ backgroundColor }) => backgroundColor.hex
  }
})

const useStylesBase = makeStyles((theme) => ({
  bpAvatar: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    alignItems: 'center'
  }
}))

const BPAvatar = ({ name }) => {
  const classesBase = useStylesBase()
  const classes = useStyles({
    backgroundColor: getColorHashByString(name)
  })

  return (
    <Grid className={classesBase.bpAvatar}>
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
