import Relay, {
} from 'react-relay/classic';

export const queries = { song: () => Relay.QL`query { node(id: $id) }` }
