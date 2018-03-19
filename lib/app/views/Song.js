import React from 'react'
import {
    createFragmentContainer,
    graphql,
} from 'react-relay'
import { Helmet } from "react-helmet";
import { Row, Col } from 'antd'

class Song extends React.Component {

    constructor(props) {
        super(props)
        const song = props.song

        this.state = { song }
    }
    render() {
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="description" content="Cesperance.com, the team providing Le Chant d'Esperance online." />
                    <link rel="canonical" href="https://cesperance.com/songs" />
                </Helmet>
                <Row>
                    <Col md={24} className="title">
                        <h2>{`${this.state.song.num}. ${this.state.song.title}`}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} className="lyrics">
                        <span dangerouslySetInnerHTML={{ __html: this.state.song.lyrics_Markdown.html }} ></span>
                    </Col>
                </Row>

            </div>
        )
    }
}
export default createFragmentContainer(Song,
    {

        /* TODO manually deal with:
        initialVariables: { id: '' }
        */
        /* TODO manually deal with:
        prepareVariables: (prevVariables) => {
            return { id: prevVariables.id }

        }
        */
        song: graphql`
                fragment Song_song on Song{
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