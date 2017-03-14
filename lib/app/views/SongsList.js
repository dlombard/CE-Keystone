import React from 'react'
import Relay from 'react-relay'
import _ from 'lodash'
import { Grid, Row, Col, Button, ButtonToolbar, ListGroup, ListGroupItem } from 'react-bootstrap'
import SearchBar from '../components/SearchBar'

class SongsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            borderColorClass: 'ce'
        }
    }
    componentDidMount() {
        console.log(_.split(this.props.location.pathname, '/')[1])
        this.setState = ({
            borderColorClass: _.split(this.props.location.pathname, '/')[1]
        })
    }
    render() {
        const { viewer } = this.props;
        return (
            <Grid>
                <Row>
                    <Col sm={12} md={9}>
                        <h2>
                            <span>{viewer.songs.edges[0].node.book.name}</span>
                        </h2>
                        <ButtonToolbar>

                            {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                            <Button className="button-primary">French</Button>

                            {/* Indicates a successful or positive action */}
                            <Button className="button-primary" active>Kreol</Button>
                        </ButtonToolbar>
                        <SearchBar style={{ width: '100%', paddingBottom: 20 }} placeholder="Filter" />
                        <ListGroup className="song-list">
                            {viewer.songs.edges.map(({ node }) =>
                                <ListGroupItem className={_.split(this.props.location.pathname, '/')[1]}>{`${node.num}. ${node.title}`}</ListGroupItem>

                            )
                            }
                        </ListGroup>
                    </Col>
                    <Col smHidden md={3}>
                        <img src="http://placehold.it/300x150" />
                    </Col>
                </Row>

            </Grid>)
    }
}


export default Relay.createContainer(SongsList,
    {
        initialVariables: { book: "MJ", lang: "fr" },
        prepareVariables: (prevVariables) => {
            return { book: _.upperCase(prevVariables.book), lang: "fr" }

        },
        fragments: {

            viewer: () => Relay.QL`
                    fragment on Viewer {

                    songs(book: $book, language:$lang, first:400){
                    edges{
                node{
                    id
                                        title
                num
                book{
                    name
                }
                                    }
                                }
                            }
                    }
                `
        }
    }
)

                /*{viewer.songs.map((song) =>
                    <div key={song.id}>
                        <span>{`${song.num} ${song.title}`}</span>
                        <br />
                        <span dangerouslySetInnerHTML={{ __html: song.lyrics_Markdown.html }}></span>
                        <br />
                        <br />
                    </div>
                )
                }*/