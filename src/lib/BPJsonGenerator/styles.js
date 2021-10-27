const Styles = (theme) => ({
  wrapperRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2)
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2)
  },
  dropzoneArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  },
  divider: {
    marginBottom: theme.spacing(2)
  },
  formField: {
    width: '100%'
  },
  checkbox: {
    paddingTop: 0,
    paddingBottom: 0
  },
  caption: {
    display: 'block'
  },
  btn: {
    height: 40,
    width: '100%',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      width: 300
    }
  },
  root: {
    width: '100%'
  },
  bar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.87)',
    padding: 0,
    '& span': {
      fontSize: 12.1,
      fontWeight: 600,
      lineHeight: 1.32,
      letterSpacing: '2px',
      color: theme.palette.secondary.main
    }
  },
  media: {
    width: 150,
    [theme.breakpoints.up('sm')]: {
      height: 150
    },
    [theme.breakpoints.up('md')]: {
      width: '50%'
    }
  },
  listPreview: {
    marginBottom: 0
  },
  center: {
    textAlign: 'center'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    height: '100%',
    width: '100%',
    overflowY: 'auto',
    outlineWidth: 0,
    [theme.breakpoints.up('sm')]: {
      height: '80%',
      width: '70%'
    }
  },
  closeIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(2, 2, 0, 2),
    '& svg': {
      fontSize: 25,
      color: theme.palette.secondary.main
    }
  },
  bodyWrapper: {
    padding: theme.spacing(0, 2, 2, 2),
    height: '100%'
  },
  nodes: {
    height: '100%'
  },
  wrapperForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  locationWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      '& .MuiFormControl-root': {
        width: '48%'
      }
    }
  },
  sectionTitle: {
    marginBottom: theme.spacing(2)
  },
  formFieldForm: {
    marginBottom: theme.spacing(2)
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(1)
  },
  chip: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  selectChips: {
    paddingBottom: 0
  },
  addButton: {
    height: 40,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 300
    }
  }
})

export default Styles
