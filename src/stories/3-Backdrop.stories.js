import React from 'react'
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { withKnobs, number } from '@storybook/addon-knobs'

import BackdropComponent from '../Backdrop'

export default {
  title: 'Backdrop',
  component: BackdropComponent,
  decorators: [withKnobs],
  viewport: {
    defaultViewport: 'iphonex'
  }
}

const useStyles = makeStyles({
  backdrop: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflowY: 'hidden'
  },
  frontLayer: {
    height: '100%',
    overflowY: 'auto',
    padding: 16
  },
  backLayer: {
    display: 'flex',
    position: 'relative',
    height: '100%'
  },
  menu: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 16
  },
  title: {
    flexGrow: 1
  }
})

export const Backdrop = () => {
  const classes = useStyles()
  const minHeight = number('minHeight', 56)

  const backLayer = (
    <div className={classes.backLayer}>
      <div className={classes.menu}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              News
            </Typography>
            <Button color='inherit'>Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  )

  const frontLayer = (
    <div className={classes.frontLayer}>
      {[1, 2, 3].map(() => (
        <Typography key={Math.random()}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </Typography>
      ))}
    </div>
  )

  return (
    <BackdropComponent
      className={classes.backdrop}
      backLayer={backLayer}
      frontLayer={frontLayer}
      backLayerOpen
      layerHeight={minHeight}
      headerText='Settings'
    />
  )
}
