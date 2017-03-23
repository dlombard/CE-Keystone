import React from 'react'
import Relay from 'react-relay'

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
export default Relay.createContainer(Song,
    {
        initialVariables: { id: '' },
        prepareVariables: (prevVariables) => {
            return { id: prevVariables.id }

        },
        fragments: {

            song: () => Relay.QL`
                    fragment on Song{
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
    }
)         