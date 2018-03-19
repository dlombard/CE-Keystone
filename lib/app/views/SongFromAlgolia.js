import React from 'react'
import {
    createFragmentContainer,
    graphql,
} from 'react-relay'
import { Helmet } from "react-helmet";
import { Grid, Row, Col } from 'react-bootstrap'

class Song extends React.Component {

    constructor(props) {
        super(props)
        const song = props.song

        this.state = { song }
    }
    render() {
        return (
            <Grid>
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="description" content="Cesperance.com, the team providing Le Chant d'Esperance online." />
                    <link rel="canonical" href="https://cesperance.com/songs" />
                </Helmet>
                <Row>
                    <Col md={12} className="title">
                        <h2>{`${this.state.song.num}. ${this.state.song.title}`}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <span dangerouslySetInnerHTML={{ __html: this.state.song.lyrics_Markdown.html }} className="lyrics"></span>
                    </Col>
                </Row>

            </Grid>
        )
    }
}
export default createFragmentContainer(Song,
    {

        song: graphql`
                fragment SongFromAlgolia_song on Song{
                    id
                title
                num
                lyrics_Markdown{
                    md
                    html
                }
                }
            `,
    }
)         