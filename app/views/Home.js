import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import SearchBar from '../components/SearchBar'

export default class Home extends React.Component {
    render() {
        return (
            <Grid>
                <h2>
                    <span> Le Chant d'Espérance</span>
                </h2>
                <Row>
                    <SearchBar />
                </Row>
                <Row>
                    <Col md={10} mdOffset={1} >
                        <Row>
                            <Col xs={6}>
                                <a href="#" >
                                    <img src="/images/ce.png" style={{ maxWidth: 60 }} />
                                    <h5> Chant d'Esperance</h5>
                                </a>
                            </Col>
                            <Col xs={6}>
                                <a href="#">
                                    <img src="/images/mj.png" style={{ maxWidth: 60 }} />
                                    <h5> Chant d'Esperance</h5>
                                </a>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <a href="#">
                                    <img src="/images/ee.png" style={{ maxWidth: 60 }} />
                                    <h5> Chant d'Esperance</h5>
                                </a>
                            </Col>
                            <Col xs={6}>
                                <a href="#">
                                    <img src="/images/vr.png" style={{ maxWidth: 60 }} />
                                    <h5> Chant d'Esperance</h5>
                                </a>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <a href="#">
                                    <img src="/images/hc.png" style={{ maxWidth: 60 }} />
                                    <h5> Chant d'Esperance</h5>
                                </a>
                            </Col>
                            <Col xs={6}>
                                <a href="#">
                                    <img src="/images/rn.png" style={{ maxWidth: 60 }} />
                                    <h5> Chant d'Esperance</h5>
                                </a>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <a href="#">
                                    <img src="/images/ga.png" style={{ maxWidth: 60 }} />
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
