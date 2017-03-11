import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

export default class App extends React.Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <Row>
                            <Col xs={6}>
                                <a href="#">
                                    <img src="/images/ce"/>
                                    <h5> Chant d'Esperance</h5>
                                </a>
                            </Col>
                            <Col xs={6}>
                                <a href="#">
                                    <img src="/images/mj"/>
                                    <h5> Chant d'Esperance</h5>
                                </a>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </Grid>
        )
    }
}
