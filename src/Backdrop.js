import React, { useState, useCallback, useEffect, createRef } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import DropUp from '@material-ui/icons/ArrowDropUp'
import DropDown from '@material-ui/icons/ArrowDropDown'
import IconButton from '@material-ui/core/IconButton'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const TRANSITION_DURATION = 250

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.primary.main
  },
  backLayer: {
    overflow: 'hidden'
  },
  backlayerTransition: {
    transitionDuration: `${TRANSITION_DURATION}ms`,
    transitionProperty: 'height',
    transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
  },
  headerBox: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2)
  },
  frontLayer: {
    width: '100%',
    flex: 1,
    borderRadius: theme.spacing(2, 2, 0, 0),
    display: 'flex',
    flexDirection: 'column'
  },
  contentWrapper: {
    position: 'relative',
    flex: 1
  },
  frontLayerContent: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  iconDrop: {
    fontSize: 25,
    padding: 0
  }
}))

const Backdrop = ({
  frontLayer,
  backLayer,
  layerHeight,
  classes: extraClasses,
  className,
  headerText
}) => {
  const theme = useTheme()
  const classes = useStyles()
  const frontLayerRef = createRef()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  const [frontLayerHeight, setFrontLayerHeight] = useState(layerHeight)
  const [transaction, setTransaction] = useState(false)

  const handleOnClick = () => {
    const contentHeight = frontLayerRef.current.clientHeight
    setNewHeight(contentHeight)
  }

  const setNewHeight = useCallback(
    async (value) => {
      const snappedY = value || layerHeight

      setTransaction(true)
      setFrontLayerHeight(snappedY)
      setTimeout(() => {
        setTransaction(false)
      }, TRANSITION_DURATION)
    },
    [layerHeight]
  )

  useEffect(() => {
    setNewHeight()
  }, [setNewHeight])

  return (
    <div className={clsx(className, classes.root, extraClasses.root)}>
      <div
        className={clsx(
          classes.backLayer,
          transaction ? classes.backlayerTransition : null,
          extraClasses.backLayer
        )}
        style={{
          height: frontLayerHeight
        }}
      >
        {backLayer}
      </div>
      <Paper
        className={clsx(classes.frontLayer, extraClasses.frontLayer)}
        ref={frontLayerRef}
      >
        <div className={classes.headerBox}>
          <Typography variant='h6'>{headerText}</Typography>
          {isMobile && (
            <IconButton
              aria-label=''
              classes={{ root: classes.iconDrop }}
              onClick={handleOnClick}
            >
              {frontLayerHeight === layerHeight ? <DropDown /> : <DropUp />}
            </IconButton>
          )}
        </div>
        <div className={classes.contentWrapper}>
          <div className={classes.frontLayerContent}>{frontLayer}</div>
        </div>
      </Paper>
    </div>
  )
}

Backdrop.defaultProps = {
  layerHeight: 56,
  frontLayer: null,
  backLayer: null,
  className: null,
  classes: {},
  headerText: 'Subheader'
}

Backdrop.propTypes = {
  layerHeight: PropTypes.number,
  frontLayer: PropTypes.node,
  backLayer: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.any),
  headerText: PropTypes.string
}

export default Backdrop
