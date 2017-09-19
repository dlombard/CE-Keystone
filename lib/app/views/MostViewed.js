import React from 'react'
import {
    createFragmentContainer,
    graphql,
} from 'react-relay/compat'
import { lowerCase } from 'lodash'
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
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
                    <NavLink to={`songs/${lowerCase(node.book.abbrv)}/${node.id}`}>
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
                    <Col sm={12} md={9} mdOffset={1} className="title">
                        <h2>
                            <span>Most Viewed</span>
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={9} mdOffset={1}>
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

export default MostViewed;
/*export default createFragmentContainer(MostViewed,
    {

        /* TODO manually deal with:
        initialVariables: { sortField: '-meta.totalViews', minTotalViews: 1, first: 30 }
        */
        /* TODO manually deal with:
        prepareVariables: (prevVariables) => {
            return { sortField: prevVariables.sortField, minTotalViews: prevVariables.minTotalViews, first: prevVariables.first }

        }
        
        viewer: graphql`
                fragment MostViewed_viewer on Viewer {

                    songs(sortField: $sortField, first:$first){
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
)*/