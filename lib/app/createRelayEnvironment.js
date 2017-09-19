import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime'
import { CONFIG } from './config'

function fetchQuery(
  operation,
  variables,
  cacheConfig,
  uploadables,
) {
  return fetch(CONFIG.graphql, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json()
  })
}

const network = Network.create(fetchQuery)
const store = new Store(new RecordSource())

export default new Environment({
  network,
  store
})