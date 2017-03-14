import React from 'react'
import Relay from 'react-relay'
import _ from 'lodash'
import {Grid, Row, Col} from 'react-bootstrap'
import SearchBar from '../components/SearchBar'

class SongsList extends React.Component {
    render() {
        const { viewer } = this.props;
        return (
                        <Grid>
                <h2>
                    <span> Le Chant d'Espérance</span>
                </h2>
                <Row>
                    <SearchBar />
                </Row>
                {viewer.songs.edges.map(({node}) =>
                    <div key={node.id}>
                        <span>{`${node.num} ${node.title}`}</span>
                        <br />
                        <span dangerouslySetInnerHTML={{ __html: node.lyrics_Markdown.html }}></span>
                        <br />
                        <br />
                    </div>
                )
                }

            </Grid>)
    }
}


export default Relay.createContainer(SongsList,
    {
        initialVariables: { book: "MJ" },
        prepareVariables: (prevVariables) => {
            console.log(prevVariables)
            return { book: _.upperCase(prevVariables.book), lang: "fr" }

        },
        fragments: {

            viewer: () => Relay.QL`
                    fragment on Viewer {
                    
                            songs(book: $book, language:$lang, first:10){
                                edges{
                                    node{
                                        id
                                        title
                                        num
                                        lyrics_Markdown{
                                            md
                                            html
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