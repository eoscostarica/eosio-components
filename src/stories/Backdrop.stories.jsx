import React from 'react'

import Backdrop from '../components/Backdrop'

export default {
  title: 'Example/Backdrop',
  component: Backdrop
}

const Template = (args) => <Backdrop {...args} />

export const Example = Template.bind({})
Example.args = {
  layerHeightUp: 200,
  layerHeightDown: 51,
  frontLayer: null,
  backLayer: null,
  className: null,
  classes: {},
  headerText: <span>Settings</span>,
  backgroundColor: '#00bace',
  isStaticPage: false
}
