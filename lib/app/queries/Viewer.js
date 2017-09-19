import Relay, {
} from 'react-relay/classic';

export const queries = { viewer: () => Relay.QL`query { viewer }` }
