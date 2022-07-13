import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import IconButton from '@mui/material/IconButton'
import Identicon from 'react-identicons'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import VpnKey from '@mui/icons-material/VpnKey'
import CircularProgress from '@mui/material/CircularProgress'

import { eosApi } from '../api/eos-api'

import Styles from './styles'
import ProgressBar from './ProgressBar'
import BPAvatar from './BPAvatar'

const useStyles = makeStyles(Styles)

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
        ram_usage: ramUsage,
        ram_quota: ramQuota,
        cpu_limit: cpuLimit,
        net_limit: netLimit,
        permissions
      } = account

      const ram = ((ramUsage * 100) / ramQuota || 0).toFixed()
      const cpu = ((cpuLimit.used * 100) / cpuLimit.max || 0).toFixed()
      const net = ((netLimit.used * 100) / netLimit.max || 0).toFixed()
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
        size="large"
        color="secondary"
        onClick={handleOpen}
        className={customBtnStyle}
      >
        Get account info
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleOpen}
      >
        <div className={classes.paper}>
          <form noValidate autoComplete="off">
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              className={classes.root}
            >
              <div className={classes.deleteBtn}>
                <Typography variant="h6" gutterBottom color="primary">
                  Get account info
                </Typography>
                <IconButton
                  classes={{ root: classes.iconBtnPadding }}
                  aria-label="delete"
                  onClick={() => setOpen(false)}
                >
                  X
                </IconButton>
              </div>
              <div className={classes.contentBox}>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  className={classes.gridBox}
                >
                  <TextField
                    variant="filled"
                    label="Account Name"
                    placeholder="eoscrtest123"
                    autoComplete="off"
                    name="accountName"
                    onChange={handleChange}
                  />
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    onClick={handleOnSubmit}
                  >
                    Get
                  </Button>
                </Grid>
                {loading && (
                  <Grid container alignItems="center" justifyContent="center">
                    <CircularProgress />
                  </Grid>
                )}
                {isError && (
                  <Grid container alignItems="center" justifyContent="center">
                    <Typography
                      variant="h4"
                      color="primary"
                      className={classes.accountName}
                    >
                      Account not found!
                    </Typography>
                  </Grid>
                )}

                {account && (
                  <div>
                    <Grid container direction="row" alignItems="center">
                      <Identicon
                        string={account.account_name || 'default'}
                        size={60}
                        fg="#757575"
                      />
                      <Grid
                        container
                        direction="column"
                        xs={9}
                        className={classes.accountInfo}
                      >
                        <Typography
                          variant="h4"
                          color="primary"
                          className={classes.accountName}
                        >
                          {account.account_name || 'defaulteos12'}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                          {`EOS  balance: ${
                            (account && account.core_liquid_balance) || '0 EOS'
                          }`}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-around"
                    >
                      <ProgressBar
                        name="ram"
                        backgroundColor="#fff"
                        percent={(account && account.ram) || 0}
                      />
                      <ProgressBar
                        name="cpu"
                        backgroundColor="#fff"
                        percent={(account && account.cpu) || 0}
                      />
                      <ProgressBar
                        name="net"
                        backgroundColor="#fff"
                        percent={(account && account.net) || 0}
                      />
                    </Grid>
                    <Grid
                      container
                      direction="column"
                      className={classes.gridBox}
                    >
                      <Accordion classes={{ root: classes.expansionPanel }}>
                        <AccordionSummary
                          classes={{
                            expanded: classes.expanded,
                            root: classes.expanded
                          }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography variant="h6" color="primary">
                            Resources
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.infoBox}>
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
                        </AccordionDetails>
                      </Accordion>
                      <Accordion classes={{ root: classes.expansionPanel }}>
                        <AccordionSummary
                          classes={{
                            expanded: classes.expanded,
                            root: classes.expanded
                          }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel3a-content"
                          id="panel3a-header"
                        >
                          <Typography variant="h6" color="primary">
                            Voter Information
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.voterInfo}>
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
                            <div>
                              <Typography className={classes.subTitleInfo}>
                                {`Voting for ${account.voter_info.producers.length} Block Producers:`}
                              </Typography>
                              <Grid className={classes.list}>
                                {account.voter_info.producers.map((value) => (
                                  <BPAvatar key={value} name={value} />
                                ))}
                              </Grid>
                            </div>
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
                        </AccordionDetails>
                      </Accordion>
                      <Accordion classes={{ root: classes.expansionPanel }}>
                        <AccordionSummary
                          classes={{
                            expanded: classes.expanded,
                            root: classes.expanded
                          }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Typography variant="h6" color="primary">
                            Keys
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.infoBox}>
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
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  </div>
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
  customBtnStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

AccountInfo.defaultProps = {
  customBtnStyle: ''
}

export default AccountInfo
