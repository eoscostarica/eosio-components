import React, { useState } from 'react'

import DropzoneHash from '../components/DropzoneHash'

export default {
  title: 'DropzoneHash',
  component: DropzoneHash
}

export const dropzone = () => {
  const [file, setFile] = useState(null)

  return (
    <DropzoneHash
      file={file}
      deleteFile={() => setFile(null)}
      handleOnDropFile={(resultFile) => setFile(resultFile)}
    />
  )
}
