import React from 'react'
import Relay from 'react-relay'
import { ListGroupItem } from 'react-bootstrap'
import NavLink from './NavLink'
class MostViewedItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        var song = this.props.song
        var url = `/songs/${song.book.abbrv}/${song.id}`

        return (
            <ListGroupItem className="most-viewed-item">
                <NavLink to={url}>
                    <p className="info">{song.title} - {song.num} {song.book.abbrv} {song.language} </p>
                    <p className="stats">{(song.meta.totalViews) ? song.meta.totalViews : 0} views</p>
                </NavLink>
            </ListGroupItem>
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
                    book{
                        abbrv
                    }
                    language
                    meta{
                        totalViews
                    }
                    }
                                    `

    }
})