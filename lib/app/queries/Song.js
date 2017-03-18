import Relay, {
} from 'react-relay';

export const queries = { song: () => Relay.QL`query { node(id: $id) }`, songByLocalID: () => Relay.QL`query { song(id: $id) }` }
