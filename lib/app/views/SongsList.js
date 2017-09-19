import React, { PureComponent } from 'react'
import {
    createRefetchContainer,
    createFragmentContainer,
    createPaginationContainer,
    graphql,
    QueryRenderer
} from 'react-relay'

import { lowerCase, upperCase } from 'lodash'
import { Row, Col, Layout, Menu, Icon, Spin } from 'antd';
import { Grid, Button, ButtonToolbar, ListGroup, ListGroupItem } from 'react-bootstrap'
import SearchBar from '../components/SearchBar'
import classNames from 'classnames'
import Link from 'found/lib/Link'
import SongListItem from './SongListItem'

class SongsList extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            borderColorClass: 'ce',
            activeLanguage: 'fr',
            data: this.props.viewer.songs.edges,
            filteredData: this.props.viewer.songs.edges,
            filter: '',
            isLoading: true,

        }
    }
    componentDidMount() {
        window.onscroll = () => {
            if ((window.innerHeight + window.scrollY)
                >= document.body.offsetHeight) {
                this._loadMore()
            }
        }
        this.setState({
            borderColorClass: this.props.params.book,
            data: this.props.viewer.songs.edges,
            filteredData: this.props.viewer.songs.edges,
            isLoading: false
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.viewer !== nextProps.viewer) {
            this.setState({
                data: nextProps.viewer.songs.edges,
            }, () => {
                this._filterSongs()
            })
        }
    }
    _loadMore = () => {
        if (!this.props.relay.hasMore()) {
            return
        } else if (this.props.relay.isLoading()) {
            return
        }
        this.setState({
            isLoading: true
        }, () => {
            this.props.relay.loadMore(30, () => {
                this.setState({
                    isLoading: false
                })
            })

        })



    }
    _renderSongs = () => {
        return this.state.filteredData.map(({ node, index }) => {
            return (
                <SongListItem song={node} key={node.is} viewer={this.props.viewer} location={this.props.location} bookClass={this.props.params.book} />


            )
        })
    }
    _fetchLanguage = (event) => {

        const lang = event.target.value
        if (this.state.activeLanguage !== lang) {

            this.setState({
                activeLanguage: lang
            }, () => {
                // Increments the number of stories being rendered by 10.
                const refetchVariables = {
                    lang: lang,
                    book: this.props.params.book,

                }
                this.props.relay.refetchConnection(5, () => {
                }, refetchVariables)

            })

        }
    }

    _handleSongSelect = (e) => {
        this.context.router.push(path)
    }
    _updateFilter = (e) => {
        e.preventDefault()
        this.setState({
            filter: this._removeAccentsByRegex(e.target.value)
        }, () => {
            this._filterSongs()
        })
    }
    _filterSongs = () => {
        const filtered = this.state.data.filter((song) => {
            return (this._removeAccentsByRegex(lowerCase(`${song.node.title} ${song.node.num}`)).indexOf(lowerCase(this.state.filter)) > -1)
        })
        this.setState({
            filteredData: filtered,
        });


    };
    _removeAccentsByRegex = (s) => {
        var r = lowerCase(s);
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
        if (this.props.viewer) {
            return (
                <div>
                    <Row>
                        <Col xs={{ span: 20, offset: 2 }} md={{ span: 14, offset: 5 }} className="title">
                            <h2>
                                <span>{this.props.viewer.songs.edges[0].node.book.name}</span>
                            </h2>
                            <ButtonToolbar>


                                <Button className={classNames("button-primary", this.state.activeLanguage === 'fr' ? 'active' : '')} value='fr' onClick={(e) => this._fetchLanguage(e)}> French</Button>


                                <Button className={classNames("button-primary", this.state.activeLanguage === 'ht' ? 'active' : '')} value='ht' onClick={(e) => this._fetchLanguage(e)} > Kreol</Button>
                            </ButtonToolbar >
                            <SearchBar style={{ width: '100%', paddingBottom: 20 }} placeholder="Filter" onChange={(e) => this._updateFilter(e)} />
                            <ListGroup className="song-list">

                                {this._renderSongs()}

                            </ListGroup>
                        </Col >
                    </Row >
                    <Row>
                        {this.state.isLoading == true &&
                            <div>
                                <Col xs={{ span: 20, offset: 2 }} md={{ span: 14, offset: 5 }}>
                                    <Spin size="large" />
                                </Col>
                                <Col xs={{ span: 20, offset: 2 }} md={{ span: 14, offset: 5 }}>
                                    <span>Loading...</span>
                                </Col>
                            </div>
                        }
                    </Row>
                </div >
            )


        }
    }
}
SongsList.contextTypes = {
    router: React.PropTypes.object
}


export default createPaginationContainer(
    SongsList,

    graphql`
      fragment SongsList_viewer on Viewer 
     {
        songs( book: $book, language: $lang, order_by: $order_by, first:$first, after:$after) @connection(key: "Songs_songs") {
          edges {
            node {
                id
                book{
                    name
                }
                title
                num
                ...SongListItem_song
            }
            
          }
          pageInfo{
              hasNextPage
              endCursor
          }
        }
        ...SongListItem_viewer
      }
      `
    ,

    {
        direction: 'forward',
        getConnectionFromProps(props) {
            return props.viewer && props.viewer.songs;
        },
        getFragmentVariables(prevVars, totalCount) {
            return {
                ...prevVars,
                count: totalCount,
            };
        },
        getVariables(props, paginationInfo, fragmentVariables) {
            return {

                // in most cases, for variables other than connection filters like
                // `first`, `after`, etc. you may want to use the previous values.

                ...fragmentVariables,
                after: paginationInfo.cursor
            };
        },
        query: graphql`
    query SongsListRefetchQuery($lang: String!, $book: String!, $first:Int, $after:String, $order_by:String) {
      viewer {
        ...SongsList_viewer
      }
    }
  `,
    }

);



