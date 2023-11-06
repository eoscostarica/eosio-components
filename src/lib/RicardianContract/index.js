import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'
import { makeStyles } from '@mui/styles'

import config from '../config'
import { getEosApi } from '../utils'

import Styles from './styles'

const useStyles = makeStyles(Styles)

const RicardianContract = ({
  name,
  url,
  abiParams,
  actionsParams,
  httpEndpoint,
  contractName,
  actionName,
  showClauses,
  loadingMessage,
  LinearProgressColor,
  errorMessage,
  LinearProgressOverrideClasses,
  title,
  showActionsAtBottom
}) => {
  const classes = useStyles()
  const [hash, setHash] = useState('')
  const [action, setAction] = useState([])
  const [clauses, setClauses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({ isError: false, message: '' })

  const useDefaultLogo = (ev) => {
    ev.target.src = config.defaultIcon
  }

  const formatRicardianAction = useCallback(
    (text = '') => {
      const [_version, content1] = text.replace(/---/g, '').split('\ntitle: ')
      const version = _version.replace(/---\n/g, '')
      const [_title, content2] = (content1 || '').split('\nsummary: ')
      const [summary, _icon] = (content2 || '').split('\nicon: ')
      const icon = _icon ? _icon.trim() : config.defaultIcon

      return (
        <div key={`action-${Math.random(0, 10000)}`}>
          <Box className={classes.boxTitle}>
            <img alt="icon" src={icon} onError={useDefaultLogo} />
            <Box className={classes.boxText}>
              <Typography variant="h1">{_title}</Typography>
              <Typography variant="subtitle2">{version}</Typography>
            </Box>
          </Box>
          <Divider className={classes.divider} />
          <Typography variant="body1">{summary}</Typography>
        </div>
      )
    },
    [classes]
  )

  const formatRicardianClauses = useCallback(
    (id, body, index) => {
      const bodyList = (body || '').split('- ')

      return (
        <div key={`clauses-${Math.random(0, 10000)}`}>
          <Box className={classes.boxTitleClauses}>
            <img alt="icon" src={config.defaultIcon} onError={useDefaultLogo} />
            <Box className={classes.boxText}>
              <Typography variant="h1">{id}</Typography>
            </Box>
          </Box>
          <Divider className={classes.dividerClauses} />
          <Typography key={index} variant="body1">
            {bodyList[0]}
          </Typography>

          {bodyList.map((text, index) => {
            if (!index) return null

            return (
              <Typography
                className={classes.listItem}
                key={index}
                variant="body1"
              >
                {`- ${text}`}
              </Typography>
            )
          })}
        </div>
      )
    },
    [classes]
  )

  useEffect(() => {
    const getData = async () => {
      try {
        const eosApi = getEosApi(httpEndpoint)
        const { abi = {} } = await eosApi.getAbi(contractName || name)
        const { code_hash: hash = '' } = await eosApi.getCodeHash(
          contractName || name
        )

        if (!abi || !abi.actions.length) return

        let actions = abi.actions.filter(
          ({ ricardian_contract: ricardianContract }) => !!ricardianContract
        )

        if (actionName) {
          actions = actions.filter(({ name }) => name === actionName)
        }

        if (actions.lenght < 1) return

        actions = actions.map(({ ricardian_contract: ricardianContract }) =>
          formatRicardianAction(ricardianContract)
        )

        let clauses = []

        if (showClauses) {
          clauses = abi.ricardian_clauses.map(({ id, body }, index) =>
            formatRicardianClauses(id, body, index)
          )
        }

        setAction(actions)
        setClauses(clauses)
        setHash(hash)
        setLoading(false)
        setError({ isError: false, message: '' })
      } catch (error) {
        setLoading(false)
        setError({
          isError: true,
          message: errorMessage
        })
      }
    }

    setLoading(true)
    getData()
  }, [
    name,
    classes,
    httpEndpoint,
    contractName,
    actionName,
    showClauses,
    formatRicardianAction,
    formatRicardianClauses,
    errorMessage
  ])

  if (error.isError) {
    return (
      <Box className={classes.ricardianContractContainer}>
        <Typography variant="h3">{error.message}</Typography>
      </Box>
    )
  }

  if (loading) {
    return (
      <Box className={classes.ricardianContractContainer}>
        <Box mt={5}>
          <Typography variant="h5" align="center">
            {(loadingMessage || '').toUpperCase()}
          </Typography>
          <LinearProgress
            color={LinearProgressColor}
            classes={LinearProgressOverrideClasses}
          />
        </Box>
      </Box>
    )
  }

  return (
    <Box className={classes.ricardianContractContainer}>
      <Typography variant="h1">{title}</Typography>
      <Typography variant="body1">
        {'Name: '}
        <Link
          href={`${url}${contractName || name}${actionsParams}`}
          variant="body2"
          target="_blank"
          rel="noopener noreferrer"
        >
          {contractName || name}
        </Link>
      </Typography>

      <Typography variant="body1">
        {'Hash: '}
        <Link
          href={`${url}${contractName || name}${abiParams}`}
          variant="body2"
          target="_blank"
          rel="noopener noreferrer"
        >
          {hash || ''}
        </Link>
      </Typography>

      {showActionsAtBottom ? (
        <>
          {clauses.map((clause) => clause)}
          {action.map((item) => item)}
        </>
      ) : (
        <>
          {action.map((item) => item)}
          {clauses.map((clause) => clause)}
        </>
      )}
    </Box>
  )
}

RicardianContract.propTypes = {
  httpEndpoint: PropTypes.string,
  contractName: PropTypes.string,
  actionName: PropTypes.string,
  showClauses: PropTypes.bool,
  showActionsAtBottom: PropTypes.bool,
  name: PropTypes.string,
  url: PropTypes.string,
  abiParams: PropTypes.string,
  actionsParams: PropTypes.string,
  loadingMessage: PropTypes.string,
  LinearProgressColor: PropTypes.string,
  errorMessage: PropTypes.string,
  LinearProgressOverrideClasses: PropTypes.object,
  title: PropTypes.string
}

RicardianContract.defaultProps = {
  httpEndpoint: 'https://jungle.eosio.cr',
  url: 'https://bloks.io/account/',
  abiParams: '?loadContract=true&tab=ABI',
  actionsParams: '?loadContract=true&tab=Actions',
  showClauses: true,
  showActionsAtBottom: false,
  loadingMessage: 'Fetching ricardian clauses from blockchain',
  LinearProgressColor: 'secondary',
  errorMessage: 'Error getting Ricardian Contract Data',
  LinearProgressOverrideClasses: {},
  title: 'Ricardian contract'
}

export default RicardianContract
