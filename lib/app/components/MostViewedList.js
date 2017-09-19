import React from 'react'
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat'
import MostViewedItem from './MostViewedItem'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import NavLink from './NavLink'
import { browserHistory } from 'react-router'

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
// TODO props.relay.* APIs do not exist on compat containers
        if (this.props.viewer.songs.edges.length === this.props.relay.variables.first) {
            return (<ListGroupItem className="most-viewed-item" onClick={this.handleRedirect}>
                    <p className="info">more...</p>
            </ListGroupItem>)
        }
        
        return null
    }
    handleRedirect = () => {

            browserHistory.push("/most-viewed")

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

export default MostViewedList;
/*export default createFragmentContainer(MostViewedList, {

    /* TODO manually deal with:
    initialVariables: { sortField: null, first: null, minTotalViews: null }
    
    viewer: graphql`
                                fragment MostViewedList_viewer on Viewer {

                songs(sortField: $sortField, first:$first, minTotalViews:$minTotalViews){
                edges{
            node{
                id
                title
                ...MostViewedItem_song
                                }
                            }
                        }
                }`

})*/