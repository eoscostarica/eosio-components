import React from 'react'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { convertHexToRgb } from '../utils/convert-hex-to-rgb'

const useStylesBase = makeStyles((theme) => ({
  skillsContainer: {
    marginTop: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexWrap: 'wrap'
  },
  circularProgress: {
    '&, &:before, &:after': {
      width: 100,
      height: 100,
      borderRadius: '50%'
    },
    margin: 'auto',
    position: 'relative',
    '&:before, &:after': {
      position: 'absolute',
      top: 0,
      left: 0,
      boxSizing: 'border-box',
      textAlign: 'center'
    },
    '&:before': {
      padding: '.5em',
      lineHeight: '56px',
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },
    '&:after': {
      fontSize: '.8rem',
      fontWeight: 'normal',
      textTransform: 'uppercase',
      lineHeight: '120px'
    }
  }
}))

const useStyles = makeStyles({
  content: {
    background: ({ color, rgb }) =>
      `linear-gradient(0deg, ${color} 50%, rgba(${rgb.r}, ${rgb.b}, ${rgb.b}, .3) 50%)`,
    transform: ({ value }) => `rotate(${value}deg)`,
    '&:before': {
      color: ({ color }) => color,
      background: '#fff content-box',
      transform: ({ value }) => `rotate(-${value}deg)`,
      content: ({ percent }) => `"${percent}%"`
    },
    '&:after': {
      color: ({ color }) => color,
      background: 'linear-gradient(transparent 50%, #fff 50%)',
      content: ({ name }) => `"${name}"`,
      transform: ({ value }) => `rotate(-${value}deg) scale(1.1)`
    }
  }
})

const CircularProgress = ({ name, color, backgroundColor, percent }) => {
  const classesBase = useStylesBase()
  const classes = useStyles({
    value: (percent / 100) * 180,
    name,
    color,
    rgb: convertHexToRgb(color),
    backgroundColor,
    percent
  })

  return (
    <div className={classesBase.skillsContainer}>
      <div className={clsx(classesBase.circularProgress, classes.content)} />
    </div>
  )
}

CircularProgress.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  percent: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

CircularProgress.defaultProps = {
  name: 'ram',
  color: '#3EBBD3',
  backgroundColor: '#fff',
  percent: 80
}

export default CircularProgress
