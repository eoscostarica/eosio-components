import EosApi from "eosjs-api";

export const getEosApi = (endpoint) => {
  return EosApi({
    httpEndpoint: endpoint,
    verbose: false,
    fetchConfiguration: {},
  });
};
