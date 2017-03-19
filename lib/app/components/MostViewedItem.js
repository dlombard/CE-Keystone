import React from 'react'
import Relay from 'react-relay'


class MostViewedItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        var song = this.props.song
        return (
            <div className="most-viewed-item">
                <span>{song.num}. {song.title} {(song.meta.totalViews) ? song.meta.totalViews : 0}</span>
            </div>
        )
    }
}

export default Relay.createContainer(MostViewedItem, {
    fragments: {

        song: () => Relay.QL`
        fragment on Song{
                        id
                    title
                    num
                    meta{
                        totalViews
                    }
                    }
                                    `

    }
})