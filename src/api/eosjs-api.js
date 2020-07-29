import { Api, JsonRpc } from 'eosjs'
import EosApi from 'eosjs-api'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'
import { TextEncoder, TextDecoder } from 'text-encoding'
import fetch from 'node-fetch'

import config from '../config'

const signatureProvider = new JsSignatureProvider([])

const rpc = new JsonRpc('https://jungle3.cryptolions.io', {
  fetch
})
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder()
})

const eosApi = EosApi({
  httpEndpoint: config.eosApiHost,
  verbose: false,
  fetchConfiguration: {}
})

export { api, rpc, eosApi }
