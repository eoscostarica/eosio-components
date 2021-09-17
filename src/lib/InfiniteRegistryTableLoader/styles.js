const Styles = () => ({
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
})

export default Styles
