const Styles = (theme) => ({
  ricardianContractContainer: {
    width: '100%',
    display: 'block !important',
    '& h3': {
      fontSize: 38
    },
    '& h1': {
      fontSize: 32,
      fontWeight: 'bold'
    },
    [theme.breakpoints.up('sm')]: {
      '& h3': {
        fontSize: 50
      }
    }
  },
  link: {
    overflowWrap: 'anywhere'
  },
  boxTitle: {
    display: 'flex',
    alignItems: 'flex-start',
    margin: `${theme.spacing(4, 0, 0, 0)} !important`,
    '& img': {
      width: 24
    }
  },
  boxText: {
    display: 'flex',
    height: 'auto !important',
    flexDirection: 'column',
    margin: `${theme.spacing(0, 0, 0, 1)} !important`,
    backgroundColor: 'transparent',
    '& h6': {
      fontWeight: '500',
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: '0.44px',
      color: '#6B717F'
    },
    '& h1': {
      fontSize: 21,
      fontWeight: '600',
      lineHeight: '27px',
      letterSpacing: '0.15px'
    }
  },
  defaultIcon: {
    fontSize: 24,
    color: '#484158'
  },
  divider: {
    marginBottom: theme.spacing(2)
  },
  boxTitleClauses: {
    display: 'flex',
    alignItems: 'center',
    margin: `${theme.spacing(4, 0, 0, 0)} !important`,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 'auto !important',
    '& img': {
      width: 24
    }
  },
  dividerClauses: {
    margin: theme.spacing(1, 0, 2, 0)
  },
  listItem: {
    margin: theme.spacing(1, 0, 1, 1)
  }
})

export default Styles
