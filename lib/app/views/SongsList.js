import React from 'react'
import Relay from 'react-relay'
import _ from 'lodash'
import { Grid, Row, Col, Button, ButtonToolbar, ListGroup, ListGroupItem } from 'react-bootstrap'
import SearchBar from '../components/SearchBar'
import classNames from 'classnames'
import { browserHistory } from 'react-router'
import NavLink from '../components/NavLink'

class SongsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            borderColorClass: 'ce',
            activeLanguage: 'fr',
            data: [],
            filteredData: [],
        }
        this._fetchLanguage = this._fetchLanguage.bind(this)
    }
    componentDidMount() {
        this.setState({
            borderColorClass: this.props.params.book
        })
    }
    componentWillMount() {
        this.setState({
            data: this.props.viewer.songs.edges,
            filteredData: this.props.viewer.songs.edges
        })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.viewer !== nextProps.viewer) {
            this.setState({
                data: nextProps.viewer.songs.edges,
                filteredData: nextProps.viewer.songs.edges
            })
        }
    }
    _renderSongs = () => {
        return this.state.filteredData.map(({ node }) => {
            return (
                <ListGroupItem className={this.props.params.book}><NavLink to={`${this.props.location.pathname}/${node.id}`}>{`${node.num}. ${node.title}`}</NavLink></ListGroupItem>

            )
        })
    }
    _fetchLanguage = (event) => {

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

    _handleSongSelect = (e) => {
        this.context.router.push(path)
    }

    _filterSongs = (e) => {
        var value = e.target.value
        var str = this._removeAccentsByRegex(value);
        const filtered = this.state.data.filter((song) => {
            return (this._removeAccentsByRegex(_.lowerCase(`${song.node.title} ${song.node.num}`)).indexOf(_.lowerCase(str)) > -1)
        });
        this.setState({
            filteredData: filtered,
        });


    };
    _removeAccentsByRegex = (s) => {
        var r = _.lowerCase(s);
        r = r.replace(new RegExp("\\s", 'g'), "");
        r = r.replace(new RegExp("[àáâãäå]", 'g'), "a");
        r = r.replace(new RegExp("æ", 'g'), "ae");
        r = r.replace(new RegExp("ç", 'g'), "c");
        r = r.replace(new RegExp("[èéêë]", 'g'), "e");
        r = r.replace(new RegExp("[ìíîï]", 'g'), "i");
        r = r.replace(new RegExp("ñ", 'g'), "n");
        r = r.replace(new RegExp("[òóôõö]", 'g'), "o");
        r = r.replace(new RegExp("œ", 'g'), "oe");
        r = r.replace(new RegExp("[ùúûü]", 'g'), "u");
        r = r.replace(new RegExp("[ýÿ]", 'g'), "y");
        r = r.replace(new RegExp("\\W", 'g'), "");
        return r;
    }
    render() {
        return (
            <Grid>
                <Row>
                    <Col sm={12} md={9} mdOffset={1} className="title">
                        <h2>
                            <span>{this.props.viewer.songs.edges[0].node.book.name}</span>
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={9} mdOffset={1}>
                        <ButtonToolbar>

                            {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                            <Button className={classNames("button-primary", this.state.activeLanguage === 'fr' ? 'active' : '')} value='fr' onClick={(e) => this._fetchLanguage(e)}> French</Button>

                            {/* Indicates a successful or positive action */}
                            <Button className={classNames("button-primary", this.state.activeLanguage === 'ht' ? 'active' : '')} value='ht' onClick={(e) => this._fetchLanguage(e)} > Kreol</Button>
                        </ButtonToolbar>
                        <SearchBar style={{ width: '100%', paddingBottom: 20 }} placeholder="Filter" onChange={(e) => this._filterSongs(e)} />
                        <ListGroup className="song-list">

                            {this._renderSongs()}

                        </ListGroup>
                    </Col>
                </Row>

            </Grid>)
    }
}
SongsList.contextTypes = {
    router: React.PropTypes.object
}

export default Relay.createContainer(SongsList,
    {
        initialVariables: { book: "MJ", lang: "fr", sortField: "num" },
        prepareVariables: (prevVariables) => {
            return { book: _.upperCase(prevVariables.book), lang: prevVariables.lang, sortField: prevVariables.sortField}

        },
        fragments: {

            viewer: () => Relay.QL`
                    fragment on Viewer {

                    songs(book: $book, language:$lang, sortField: $sortField, first:400){
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
                    },
                `,
            
        }
    }
)