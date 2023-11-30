const Styles = (theme) => ({
  wrapperRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2)
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column !important',
    marginBottom: theme.spacing(2),
    '& .MuiTypography-h5': {
      paddingBottom: theme.spacing(2)
    }
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
    marginBottom: `${theme.spacing(2)} !important`
  },
  formField: {
    width: '100%'
  },
  btn: {
    height: 40,
    width: '100%',
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
    overflowY: 'auto',
    maxHeight: '80%',
    outlineWidth: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  closeIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(2, 2, 0, 2),
    '& svg': {
      fontSize: 25,
      color: theme.palette.primary.main
    }
  },
  bodyWrapper: {
    padding: theme.spacing(0, 2, 2, 2)
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
    gap: theme.spacing(4),
    '& .MuiFormControl-root': {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      '& .MuiFormControl-root': {
        width: '45%'
      }
    }
  },
  sectionTitle: {
    padding: `${theme.spacing(2)} 0px !important`
  },
  formFieldForm: {
    marginBottom: `${theme.spacing(2)} !important`
  },
  chip: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  addButton: {
    height: 40,
    width: '100%',
    margin: `${theme.spacing(4, 0)} !important`,
    [theme.breakpoints.up('md')]: {
      width: 300
    }
  },
  nodeTypeSelector: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing(4),
    '& .MuiFormControl-root': {
      width: '45%'
    }
  },
  iconError: {
    width: '64px !important',
    height: '64px !important',
    color: theme.palette.error.main
  }
})

export default Styles
