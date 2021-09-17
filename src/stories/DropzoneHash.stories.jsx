import React from 'react'

import DropzoneHash from '../lib/DropzoneHash'

export default {
  title: 'Example/Dropzone Hash',
  component: DropzoneHash
}

const Template = (args) => <DropzoneHash {...args} />

export const Example = Template.bind({})
Example.args = {
  handleOnDropFile: () => {},
  file: null,
  deleteFile: () => {}
}
