import React from 'react'
import Relay from 'react-relay'
import MostViewedItem from './MostViewedItem'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import NavLink from './NavLink'

class MostViewedList extends React.Component {
    constructor(props) {
        super(props)
    }

    _renderList = () => {
        return this.props.viewer.songs.edges.map(({ node }) => {
            return (
                <div>
                    <MostViewedItem
                        song={node}
                    />
                </div>
            )
        })
    }
    _renderMore = () => {
        if (this.props.viewer.songs.edges.length === this.props.relay.variables.first) {
            return (<ListGroupItem className="most-viewed-item">
                <NavLink to="/most-viewed">
                    <p className="info">more...</p>
                </NavLink>
            </ListGroupItem>)
        }
        
        return null
    }
    render() {
        return (
            <ListGroup>
                {this._renderList()}
                {this._renderMore()}
            </ListGroup>
        )
    }
}

export default Relay.createContainer(MostViewedList, {
    initialVariables: { sortField: null, first: null, minTotalViews: null },
    prepareVariables: (prevVariables) => ({ sortField: prevVariables.sortField, first: prevVariables.first, minTotalViews: prevVariables.minTotalViews }),
    fragments: {

        viewer: () => Relay.QL`
                                    fragment on Viewer {

                    songs(sortField: $sortField, first:$first, minTotalViews:$minTotalViews){
                    edges{
                node{
                    id
                    title
                    ${MostViewedItem.getFragment('song')}
                                    }
                                }
                            }
                    }`

    }
})