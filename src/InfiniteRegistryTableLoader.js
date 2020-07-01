//#region imports
import React, { useState } from 'react'
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader'
import { Table, Column } from 'react-virtualized/dist/commonjs/Table'
import { makeStyles } from '@material-ui/styles'
//#endregion

//#region declarations
const useStyles = makeStyles(() => ({
  flexContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center'
  },
  table: {
    justifySelf: 'center',
    justifyContent: 'center',
    padding: '0',
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
      flip: false,
      margin: 'auto'
    },
    '& .ReactVirtualized__Table__Grid': {
      margin: 'auto'
    }
  },
  tableRow: {
    cursor: 'pointer'
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: 'gray'
    }
  },
  tableCell: {
    flex: 1,
    padding: '2px'
  },
  noClick: {
    cursor: 'initial'
  },
  click: {
    cursor: 'pointer'
  }
}))
//#endregion

const InfiniteTable = ({
  /** Are there more items to load? (This information comes from the most recent API request.) */
  hasNextPage,
  /** Are we currently loading a page of items? (This may be an in-flight flag in your Redux store for example.) */
  isNextPageLoading,
  /** List of items loaded so far */
  rows,
  /** Callback function (eg. Redux action-creator) responsible for loading the next page of items */
  loadNextPage,
  columns,
  onRowClick,
  width,
  height
}) => {
  const classes = useStyles()

  const cellRenderer = ({ cellData, columnIndex }) => {
    return (
      <TableCell
        component='div'
        onClick={columnIndex === 4 ? () => handleClickOpen() : undefined}
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          {
            [classes.noClick]: onRowClick == null
          },
          columnIndex === 4 ? classes.click : undefined
        )}
        variant='body'
        style={{ height: 48 }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? 'right'
            : 'left'
        }
      >
        {cellData}
      </TableCell>
    )
  }

  const headerRenderer = ({ label, columnIndex }) => {
    return (
      <TableCell
        component='div'
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant='head'
        style={{ height: 48 }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    )
  }

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreRows = isNextPageLoading
    ? (e) => {
        console.log(e)
      }
    : loadNextPage

  // Every row is loaded except for our loading indicator row.
  const isRowLoaded = ({ index }) => !hasNextPage || index < rows.size
}
