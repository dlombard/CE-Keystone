import React from 'react'
import Relay from 'react-relay'
import _ from 'lodash'
import { Grid, Row, Col, Button, ButtonToolbar, ListGroup, ListGroupItem } from 'react-bootstrap'
import classNames from 'classnames'
import { browserHistory } from 'react-router'
import NavLink from '../components/NavLink'

class MostViewed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            borderColorClass: 'ce',
        }
    }
    componentDidMount() {
    }
    componentWillMount() {
    }
    componentWillReceiveProps(nextProps) {

    }
    _renderSongs = () => {
        return this.props.viewer.songs.edges.map(({ node }) => {
            return (
                <ListGroupItem className={this.props.params.book}>
                    <NavLink to={`songs/${_.lowerCase(node.book.abbrv)}/${node.id}`}>
                        <span>{`${node.title} - `}</span><span><strong>{`${node.num} ${node.book.abbrv} ${node.language}`}</strong></span>
                        <span className="pull-right">{`${node.meta.totalViews} views`}</span>
                    </NavLink>
                </ListGroupItem >

            )
        })
    }

    _handleSongSelect = (e) => {
        this.context.router.push(path)
    }


    render() {
        return (
            <Grid>
                <Row>
                    <Col sm={12} md={9} className="title">
                        <h2>
                            <span>Most Viewed</span>
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={9}>
                        <ListGroup className="song-list">

                            {this._renderSongs()}

                        </ListGroup>
                    </Col>
                </Row>

            </Grid>)
    }
}
MostViewed.contextTypes = {
    router: React.PropTypes.object
}

export default Relay.createContainer(MostViewed,
    {
        initialVariables: { sortField: "-meta.totalViews", minTotalViews: 1 },
        prepareVariables: (prevVariables) => {
            return { sortField: prevVariables.sortField, minTotalViews: prevVariables.minTotalViews }

        },
        fragments: {

            viewer: () => Relay.QL`
                    fragment on Viewer {

                        songs(sortField: $sortField, first:30, minTotalViews: $minTotalViews){
                        edges{
                    node{
                        id
                                        title
                    num
                book{
                        name
                    abbrv
                    }
                language
                meta{
                        totalViews
                    }
                    }
                                }
                            }
                    },
                `,

        }
    }
)