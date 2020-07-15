import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import IconButton from '@material-ui/core/IconButton'
import Identicon from 'react-identicons'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import VpnKey from '@material-ui/icons/VpnKey'
import CircularProgress from '@material-ui/core/CircularProgress'

import { eosApi } from '../../api/eosjs-api'
import ProgressBar from './ProgressBar'
import BPAvatar from './BPAvatar'

const useStyles = makeStyles((theme) => ({
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
}))

const AccountInfo = ({ customBtnStyle }) => {
  const classes = useStyles()
  const [value, setValue] = useState()
  const [account, setAccount] = useState(null)
  const [isError, setIsError] = useState(false)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleOpen = async () => {
    setOpen(!open)
  }

  const handleOnSubmit = async () => {
    try {
      setLoading(true)

      const account = await eosApi.getAccount((value || '').toLocaleLowerCase())

      if (Object.keys(account).length === 0) throw new Error('No Account data!')

      const {
        ram_usage,
        ram_quota,
        cpu_limit,
        net_limit,
        permissions
      } = account

      const ram = ((ram_usage * 100) / ram_quota || 0).toFixed()
      const cpu = ((cpu_limit.used * 100) / cpu_limit.max || 0).toFixed()
      const net = ((net_limit.used * 100) / net_limit.max || 0).toFixed()
      const keys = {
        active: {
          label: permissions[0].perm_name,
          value: permissions[0].required_auth.keys[0].key
        },
        owner: {
          label: permissions[1].perm_name,
          value: permissions[1].required_auth.keys[0].key
        }
      }

      setAccount({ ...account, ram, cpu, net, keys })
      setIsError(false)
      setLoading(false)
    } catch (error) {
      console.log('Get account info', error)
      setIsError(true)
      setLoading(false)
    }
  }

  const handleChange = (event) => {
    event.preventDefault()
    const { value } = event.target

    setValue(value)
  }

  return (
    <div>
      <Button
        size='large'
        color='secondary'
        onClick={handleOpen}
        className={customBtnStyle}
      >
        Get account info
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <div className={classes.paper}>
          <form noValidate autoComplete='off'>
            <Grid
              container
              direction='column'
              justify='space-between'
              className={classes.root}
            >
              <div className={classes.deleteBtn}>
                <Typography variant='h6' gutterBottom color='primary'>
                  Get account info
                </Typography>
                <IconButton
                  classes={{ root: classes.iconBtnPadding }}
                  aria-label='delete'
                  onClick={() => setOpen(false)}
                >
                  X
                </IconButton>
              </div>
              <div className={classes.contentBox}>
                <Grid
                  container
                  direction='row'
                  justify='flex-start'
                  className={classes.gridBox}
                >
                  <TextField
                    variant='filled'
                    label='Account Name'
                    placeholder='eoscrtest123'
                    autoComplete='off'
                    name='accountName'
                    onChange={handleChange}
                  />
                  <Button
                    size='large'
                    variant='contained'
                    color='secondary'
                    onClick={handleOnSubmit}
                  >
                    Get
                  </Button>
                </Grid>
                {loading && (
                  <Grid container alignItems='center' justify='center'>
                    <CircularProgress />
                  </Grid>
                )}
                {isError && (
                  <Grid container alignItems='center' justify='center'>
                    <Typography
                      variant='h4'
                      color='primary'
                      className={classes.accountName}
                    >
                      Account not found!
                    </Typography>
                  </Grid>
                )}

                {account && (
                  <>
                    <Grid container direction='row' alignItems='center'>
                      <Identicon
                        string={account.account_name || 'default'}
                        size={60}
                        fg='#757575'
                      />
                      <Grid
                        container
                        direction='column'
                        xs={9}
                        className={classes.accountInfo}
                      >
                        <Typography
                          variant='h4'
                          color='primary'
                          className={classes.accountName}
                        >
                          {account.account_name || 'defaulteos12'}
                        </Typography>
                        <Typography variant='h6' color='textSecondary'>
                          {`EOS  balance: ${
                            (account && account.core_liquid_balance) || '0 EOS'
                          }`}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container direction='row' justify='space-around'>
                      <ProgressBar
                        name='ram'
                        backgroundColor='#fff'
                        percent={(account && account.ram) || 0}
                      />
                      <ProgressBar
                        name='cpu'
                        backgroundColor='#fff'
                        percent={(account && account.cpu) || 0}
                      />
                      <ProgressBar
                        name='net'
                        backgroundColor='#fff'
                        percent={(account && account.net) || 0}
                      />
                    </Grid>
                    <Grid
                      container
                      direction='column'
                      className={classes.gridBox}
                    >
                      <ExpansionPanel
                        classes={{ root: classes.expansionPanel }}
                      >
                        <ExpansionPanelSummary
                          classes={{
                            expanded: classes.expanded,
                            root: classes.expanded
                          }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls='panel1a-content'
                          id='panel1a-header'
                        >
                          <Typography variant='h6' color='primary'>
                            Resources
                          </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.infoBox}>
                          <div className={classes.detailBox}>
                            <Typography className={classes.subTitleInfo}>
                              Available:
                            </Typography>
                            <Typography>
                              {account.core_liquid_balance}
                            </Typography>
                          </div>
                          <div className={classes.detailBox}>
                            <Typography className={classes.subTitleInfo}>
                              CPU staked:
                            </Typography>
                            <Typography>
                              {account.total_resources.cpu_weight}
                            </Typography>
                          </div>
                          <div className={classes.detailBox}>
                            <Typography className={classes.subTitleInfo}>
                              NET staked:
                            </Typography>
                            <Typography>
                              {account.total_resources.net_weight}
                            </Typography>
                          </div>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                      <ExpansionPanel
                        classes={{ root: classes.expansionPanel }}
                      >
                        <ExpansionPanelSummary
                          classes={{
                            expanded: classes.expanded,
                            root: classes.expanded
                          }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls='panel3a-content'
                          id='panel3a-header'
                        >
                          <Typography variant='h6' color='primary'>
                            Voter Information
                          </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.voterInfo}>
                          {Boolean(account.voter_info.proxy.length) && (
                            <div className={classes.detailBox}>
                              <Typography className={classes.subTitleInfo}>
                                Proxy:
                              </Typography>
                              <Typography>
                                {account.voter_info.proxy}
                              </Typography>
                            </div>
                          )}

                          {account.voter_info.producers.length && (
                            <>
                              <Typography className={classes.subTitleInfo}>
                                {`Voting for ${account.voter_info.producers.length} Block Producers:`}
                              </Typography>
                              <Grid className={classes.list}>
                                {account.voter_info.producers.map((value) => (
                                  <BPAvatar key={value} name={value} />
                                ))}
                              </Grid>
                            </>
                          )}

                          <div className={classes.detailBox}>
                            <Typography className={classes.subTitleInfo}>
                              Vote weight:
                            </Typography>
                            <Typography>
                              {account.voter_info.last_vote_weight}
                            </Typography>
                          </div>
                          <div className={classes.detailBox}>
                            <Typography className={classes.subTitleInfo}>
                              Is Proxy:
                            </Typography>
                            <Typography>
                              {account.voter_info.is_proxy ? 'True' : 'False'}
                            </Typography>
                          </div>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                      <ExpansionPanel
                        classes={{ root: classes.expansionPanel }}
                      >
                        <ExpansionPanelSummary
                          classes={{
                            expanded: classes.expanded,
                            root: classes.expanded
                          }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls='panel2a-content'
                          id='panel2a-header'
                        >
                          <Typography variant='h6' color='primary'>
                            Keys
                          </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.infoBox}>
                          <div>
                            <Typography className={classes.subTitleInfo}>
                              {account.keys.active.label}
                            </Typography>
                            <div className={classes.detailBox}>
                              <VpnKey className={classes.keyIcon} />
                              <Typography>
                                {account.keys.active.value}
                              </Typography>
                            </div>
                          </div>
                          <div>
                            <Typography className={classes.subTitleInfo}>
                              {account.keys.owner.label}
                            </Typography>
                            <div className={classes.detailBox}>
                              <VpnKey className={classes.keyIcon} />
                              <Typography>
                                {account.keys.owner.value}
                              </Typography>
                            </div>
                          </div>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </Grid>
                  </>
                )}
              </div>
            </Grid>
          </form>
        </div>
      </Modal>
    </div>
  )
}

AccountInfo.propTypes = {
  customBtnStyle: PropTypes.object
}

AccountInfo.defaultProps = {
  customBtnStyle: {}
}

export default AccountInfo
