import React from 'react'
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader'
import { Table, Column } from 'react-virtualized/dist/commonjs/Table'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import clsx from 'clsx'

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
    '& .ReactVirtualized__Table__headerRow': {
      flip: false,
      margin: 'auto'
    },
    '& .ReactVirtualized__Table__Grid': {
      margin: 'auto'
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

const InfiniteRegistryTableLoader = ({
  /** Are there more items to load?
   * (This information comes from the most recent API request.)
   * */
  hasNextPage,
  /**
   * Currently loading a page of items?
   * */
  isNextPageLoading,
  rows,
  /** Callback function
   * responsible for loading the next page of items */
  loadNextPage,
  columns,
  onRowClick,
  width,
  height,
  rowHeight,
  headerHeight
}) => {
  const classes = useStyles()

  const cellRenderer = ({ cellData, columnIndex }) => {
    return (
      <TableCell
        component='div'
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

  const loadMoreRows = isNextPageLoading
    ? (e) => {
        console.log(e)
      }
    : loadNextPage

  // Every row is loaded except for our loading indicator row.
  const isRowLoaded = ({ index }) => !hasNextPage || index < rows.size

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={1000}
    >
      {({ onRowsRendered, registerChild }) => (
        <Table
          ref={registerChild}
          onRowsRendered={onRowsRendered}
          height={height}
          width={width}
          rowHeight={rowHeight || 48}
          gridStyle={{
            direction: 'inherit'
          }}
          rowCount={rows.length}
          rowGetter={({ index }) => rows[index]}
          headerHeight={headerHeight || 48}
          className={classes.table}
          rowClassName={classes.flexContainer}
        >
          {columns.map(({ dataKey, ...other }, index) => {
            return (
              <Column
                key={dataKey}
                headerRenderer={(headerProps) =>
                  headerRenderer({
                    ...headerProps,
                    columnIndex: index
                  })
                }
                className={classes.flex}
                cellRenderer={cellRenderer}
                dataKey={dataKey}
                {...other}
              />
            )
          })}
        </Table>
      )}
    </InfiniteLoader>
  )
}

InfiniteRegistryTableLoader.propTypes = {
  hasNextPage: PropTypes.bool,
  isNextPageLoading: PropTypes.bool,
  rows: PropTypes.array,
  loadNextPage: PropTypes.func,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired
    })
  ).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  rowHeight: PropTypes.number,
  headerHeight: PropTypes.number
}
export default InfiniteRegistryTableLoader
