const Styles = (theme) => ({
  root: {
    minHeight: 400,
    display: 'flex',
    padding: 0
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    padding: theme.spacing(2),
    width: '100%',
    height: 'auto',
    '&:focus': {
      outline: 'none'
    },
    [theme.breakpoints.up('sm')]: {
      width: 600
    }
  },
  contentBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 300,
    maxHeight: 450,
    overflowX: 'scroll',
    marginTop: theme.spacing(1),
    '& button': {
      marginLeft: theme.spacing(2)
    }
  },
  deleteBtn: {
    height: 27,
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    borderBottom: '1px solid #e9ecef'
  },
  iconBtnPadding: {
    padding: 0
  },
  avatar: {
    margin: 5,
    width: 30,
    height: 30,
    fontSize: 12
  },
  accountInfo: {
    marginLeft: theme.spacing(2)
  },
  accountName: {
    margin: 0,
    fontWeight: '500'
  },
  gridBox: {
    marginBottom: theme.spacing(2)
  },
  expansionPanel: {
    boxShadow: 'none',
    width: '100%'
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  displayNone: {
    display: 'none important!'
  },
  voterInfo: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 200,
    overflowX: 'scroll'
  },
  subTitleInfo: {
    fontWeight: 500
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 15px !important'
  },
  titleInfo: {
    fontWeight: 500
  },
  detailBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    '& p:nth-child(2)': {
      marginLeft: theme.spacing(1),
      color: 'rgba(0, 0, 0, 0.54)'
    }
  },
  expanded: {
    margin: '0px !important',
    padding: 0,
    '& div': {
      margin: '0px !important'
    }
  },
  keyIcon: {
    marginLeft: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.54)'
  }
})

export default Styles
