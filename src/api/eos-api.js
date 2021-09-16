import EosApi from 'eosjs-api'
import { JsonRpc } from 'eosjs'

import config from '../config'

const rpc = new JsonRpc(config.eosApiHost)
const eosApi = EosApi({
  httpEndpoint: config.eosApiHost,
  verbose: false,
  fetchConfiguration: {}
})

export { eosApi, rpc }
