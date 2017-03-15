import React from 'react'
import Relay from 'react-relay'
import _ from 'lodash'
import { Grid, Row, Col, Button, ButtonToolbar, ListGroup, ListGroupItem } from 'react-bootstrap'
import SearchBar from '../components/SearchBar'
import classNames from 'classnames'

class SongsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            borderColorClass: 'ce',
            activeLanguage: 'fr',
        }
        this._fetchLanguage = this._fetchLanguage.bind(this)

    }
    componentDidMount() {
        console.log(_.split(this.props.location.pathname, '/')[1])
        this.setState({
            borderColorClass: _.split(this.props.location.pathname, '/')[1]
        })
    }
    componentDidUpdate(prevProps, prevState) {
    }
    _renderSongs = () => {
        return this.props.viewer.songs.edges.map(({ node }) => {
            return (
                <ListGroupItem className={_.split(this.props.location.pathname, '/')[1]}>{`${node.num}. ${node.title}`}</ListGroupItem>

            )
        })
    }
    _fetchLanguage(event) {

        var lang = event.target.value
        if (this.state.activeLanguage !== lang) {

            this.setState({
                activeLanguage: lang
            }, () => {
                this.props.relay.setVariables({
                    lang
                })
            })

        }
    }
    render() {
        return (
            <Grid>
                <Row>
                    <Col sm={12} md={9}>
                        <h2>
                            <span>{this.props.viewer.songs.edges[0].node.book.name}</span>
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={9}>
                        <ButtonToolbar>

                            {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                            <Button className={classNames("button-primary", this.state.activeLanguage === 'fr' ? 'active' : '')} value='fr' onClick={(e) => this._fetchLanguage(e)}> French</Button>

                            {/* Indicates a successful or positive action */}
                            <Button className={classNames("button-primary", this.state.activeLanguage === 'ht' ? 'active' : '')} value='ht' onClick={(e) => this._fetchLanguage(e)} > Kreol</Button>
                        </ButtonToolbar>
                        <SearchBar style={{ width: '100%', paddingBottom: 20 }} placeholder="Filter" />
                        <ListGroup className="song-list">

                            {this._renderSongs()}

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
            return { book: _.upperCase(prevVariables.book), lang: prevVariables.lang }

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