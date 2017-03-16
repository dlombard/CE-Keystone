import React from 'react'
import Relay from 'react-relay'
import _ from 'lodash'

import { Grid, Row, Col } from 'react-bootstrap'

class Song extends React.Component {
    render() {
        return (
            <Grid>
                <Row>
                <Col md={12} className="title">
                    <h2>{`${this.props.song.num}. ${this.props.song.title}`}</h2>
                </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <span dangerouslySetInnerHTML={{ __html: this.props.song.lyrics_Markdown.html }} className="lyrics"></span>
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
                `
        }
    }
)             