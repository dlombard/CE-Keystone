import Relay, {
} from 'react-relay';

export const queries = { song: () => Relay.QL`query { song(id: $id) }` }