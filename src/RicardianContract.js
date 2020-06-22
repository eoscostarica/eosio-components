import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import { eosApi } from './api/eosjs-api'

const RicardianContract = ({ name }) => {
  const [source, setSource] = useState('')
  const formatRicardianClause = (text = '') => {
    const [_version, content1] = text.split('\ntitle: ')
    const version = _version.replace(/---\n/g, '')
    const [_title, content2] = content1.split('\nsummary: ')
    const title = `# ${_title}`
    const [summary, _icon] = `${content2}`.split('\nicon: ')
    const icon = _icon ? `![icon](${_icon})` : ''

    return `${title}\n\n${version}:\n\n${summary}\n\n${icon}`
  }

  useEffect(() => {
    async function getData() {
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

      const mainTitle = '# Ricardian contract'
      const nameSection = `**Name:** [${name}](https://jungle.bloks.io/account/${name}?loadContract=true&tab=Actions)`
      const hashSection = `**Hash:** [${hash}](https://jungle.bloks.io/account/${name}?loadContract=true&tab=ABI)`

      setSource(
        [mainTitle, nameSection, hashSection, ...actions, ...clauses].join(
          '\n\n'
        )
      )
    }

    getData()
  }, [name])

  return <ReactMarkdown source={source} />
}

RicardianContract.propTypes = {
  name: PropTypes.string
}

export default RicardianContract
