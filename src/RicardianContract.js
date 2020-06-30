import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'
import { makeStyles } from '@material-ui/core/styles'

import { eosApi } from './api/eosjs-api'

const useStyles = makeStyles((theme) => ({
  ricardianContractContainer: {
    padding: theme.spacing(2, 3),
    '& h3': {
      fontSize: 38
    },
    [theme.breakpoints.up('sm')]: {
      '& h3': {
        fontSize: 50
      }
    }
  },
  boxTitle: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(1),
    '& img': {
      width: 50
    }
  },
  boxText: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
    '& h6': {
      fontStyle: 'italic',
      lineHeight: 1
    },
    '& h4': {
      lineHeight: 1
    }
  },
  defaultIcon: {
    fontSize: 65,
    color: '#484158'
  },
  divider: {
    marginBottom: theme.spacing(2)
  }
}))

const RicardianContract = ({ name, url }) => {
  const classes = useStyles()
  const [hash, setHash] = useState('')
  const [action, setAction] = useState([])
  const [clauses, setClauses] = useState([])

  const formatRicardianClause = useCallback(
    (text = '') => {
      const [_version, content1] = text.split('\ntitle: ')
      const version = _version.replace(/---\n/g, '')
      const [_title, content2] = content1.split('\nsummary: ')
      const [summary, _icon] = `${content2}`.split('\nicon: ')

      return (
        <Box>
          <Box className={classes.boxTitle}>
            {_icon ? (
              <img alt='icon' src={_icon} />
            ) : (
              <DescriptionOutlinedIcon className={classes.defaultIcon} />
            )}
            <Box className={classes.boxText}>
              <Typography color='primary' variant='h4'>
                {_title}
              </Typography>
              <Typography color='primary' variant='subtitle2'>
                {version}
              </Typography>
            </Box>
          </Box>
          <Divider className={classes.divider} />
          <Typography variant='body1'>{summary}</Typography>
        </Box>
      )
    },
    [classes]
  )

  useEffect(() => {
    const getData = async () => {
      const { abi = {} } = await eosApi.getAbi(name)
      const { code_hash: hash = '' } = await eosApi.getCodeHash(name)

      if (!abi || !abi.actions.length) return

      let actions = abi.actions.filter(
        ({ ricardian_contract: ricardianContract }) => !!ricardianContract
      )

      if (actions.lenght < 1) return

      actions = actions.map(({ ricardian_contract: ricardianContract }) =>
        formatRicardianClause(ricardianContract)
      )

      const clauses = abi.ricardian_clauses.map(({ body }) =>
        formatRicardianClause(body)
      )

      setAction(actions)
      setClauses(clauses)
      setHash(hash)
    }

    getData()
  }, [name, formatRicardianClause])

  return (
    <Box className={classes.ricardianContractContainer}>
      <Typography variant='h3'>Ricardian contract</Typography>
      <Typography variant='body1'>
        {'Name: '}
        <Link
          href={`${url}/account/${name}?loadContract=true&tab=Actions`}
          variant='body2'
          target='_blank'
          rel='noopener noreferrer'
        >
          {name}
        </Link>
      </Typography>

      <Typography variant='body1'>
        {'Hash: '}
        <Link
          href={`${url}/account/${name}?loadContract=true&tab=ABI`}
          variant='body2'
          target='_blank'
          rel='noopener noreferrer'
        >
          {hash || ''}
        </Link>
      </Typography>

      {action.map((item) => item)}
      {clauses.map((clause) => clause)}
    </Box>
  )
}

RicardianContract.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string
}

RicardianContract.defaultProps = {
  url: 'https://bloks.io'
}

export default RicardianContract
