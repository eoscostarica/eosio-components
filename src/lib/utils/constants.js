const NODE_TYPES = { PRODUCER: 'producer', QUERY: 'query', SEED: 'seed' }

const NODE_EXTRA_KEYS = {
  [NODE_TYPES.QUERY]: ['api_endpoint', 'ssl_endpoint', 'features'],
  [NODE_TYPES.SEED]: ['p2p_endpoint']
}

export { NODE_TYPES, NODE_EXTRA_KEYS }