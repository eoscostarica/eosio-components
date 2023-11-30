const NODE_TYPES = { PRODUCER: 'producer', QUERY: 'query', SEED: 'seed' }

const NODE_EXTRA_KEYS = {
  [NODE_TYPES.QUERY]: ['api_endpoint', 'ssl_endpoint', 'features'],
  [NODE_TYPES.SEED]: ['p2p_endpoint']
}

const NODE_FEATURES = [
  {
    label: 'chain-api',
    value: 'chain-api',
    info: 'basic eosio::chain_api_plugin (/v1/chain/*)'
  },
  {
    label: 'account-query',
    value: 'account-query',
    info: '(/v1/chain/get_accounts_by_authorizers)'
  },
  {
    label: 'history-v1',
    value: 'history-v1',
    info: '(/v1/history/*)'
  },
  {
    label: 'hyperion-v2',
    value: 'hyperion-v2',
    info: '(/v2/*)'
  },
  {
    label: 'dfuse',
    value: 'dfuse',
    info: ''
  },
  {
    label: 'fio-api',
    value: 'fio-api',
    info: ''
  },
  {
    label: 'snapshot-api',
    value: 'snapshot-api',
    info: ''
  },
  {
    label: 'dsp-api',
    value: 'dsp-api',
    info: ''
  },
  {
    label: 'atomic-assets-api',
    value: 'atomic-assets-api',
    info: ''
  }
]

export { NODE_TYPES, NODE_EXTRA_KEYS, NODE_FEATURES }
