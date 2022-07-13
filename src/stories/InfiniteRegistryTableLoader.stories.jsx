import React, { useState } from 'react'
import LockIcon from '@mui/icons-material/Lock'
import IconButton from '@mui/material/IconButton'
import { AutoSizer } from 'react-virtualized'

import InfiniteRegistryTableLoader from '../lib/InfiniteRegistryTableLoader'

export default {
  title: 'Example/Infinite Registry Table Loader',
  component: InfiniteRegistryTableLoader
}

const Template = (args) => {
  const [, setWidth] = useState(400)
  const [columnWidth, setColumnWidth] = useState(200)
  const sample = [
    {
      title: 'title name',
      account: 'account',
      date: 'June 1st',
      hash: 'ca13sdfad232334',
      certificate: (
        <IconButton aria-label="delete" size="medium">
          <LockIcon fontSize="inherit" />
        </IconButton>
      )
    },
    {
      title: 'title name',
      account: 'account',
      date: 'June 1st',
      hash: 'ca13sdfad232334',
      certificate: (
        <IconButton aria-label="delete" size="medium">
          <LockIcon fontSize="inherit" />
        </IconButton>
      )
    },
    {
      title: 'title name',
      account: 'account',
      date: 'June 1st',
      hash: 'ca13sdfad232334',
      certificate: (
        <IconButton aria-label="delete" size="medium">
          <LockIcon fontSize="inherit" />
        </IconButton>
      )
    }
  ]
  const rows = []

  for (let i = 0; i < 100; i += 1) {
    const randomSelection = sample[Math.floor(Math.random() * sample.length)]
    rows.push(randomSelection)
  }
  const columns = [
    {
      width: columnWidth,
      label: 'Titulo',
      dataKey: 'title'
    },
    {
      width: columnWidth,
      label: 'Cuenta',
      dataKey: 'account',
      numeric: true
    },
    {
      width: columnWidth,
      label: 'Fecha',
      dataKey: 'date'
    },
    {
      width: columnWidth,
      label: 'Hash',
      dataKey: 'hash'
    },
    {
      width: columnWidth,
      label: 'Certificado',
      dataKey: 'certificate'
    }
  ]

  const onResize = ({ width }) => {
    setWidth(width)
    let newColumnWidth = width / columns.length
    newColumnWidth = Math.max(100, 150)
    newColumnWidth = Math.min(200, 150)
    newColumnWidth = Math.floor(newColumnWidth)
    setColumnWidth(newColumnWidth)
    setWidth(Math.min(width, columnWidth * columns.length))
  }

  return (
    <AutoSizer onResize={onResize}>
      {({ height, width }) => (
        <InfiniteRegistryTableLoader
          hasNextPage
          isNextPageLoading
          rows={rows}
          height={height || 500}
          width={width}
          loadNextPage={(e) => console.log(e)}
          columns={columns}
          rowHeight={48}
          headerHeight={48}
        />
      )}
    </AutoSizer>
  )
}

export const Example = Template.bind({})
