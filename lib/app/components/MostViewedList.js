import React from 'react'
import Relay from 'react-relay'
import MostViewedItem from './MostViewedItem'

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
    render() {
        return (
            <div>
                {this._renderList()}
            </div>
        )
    }
}

export default Relay.createContainer(MostViewedList, {
    initialVariables: { sortField: '-meta.totalViews' },
    prepareVariables: (prevVariables) => ({ sortField: prevVariables.sortField }),
    fragments: {

        viewer: () => Relay.QL`
                                    fragment on Viewer {

                    songs(sortField: $sortField, first:5){
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