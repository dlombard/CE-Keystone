import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import SearchBar from '../components/SearchBar'
import NavLink from '../components/NavLink'
import algoliasearch from 'algoliasearch'
const algoliaClient = algoliasearch('applicationID', 'apiKey');
import { browserHistory } from 'react-router'

export default class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            index: algoliaClient.initIndex('cesperance'),
            value: ''
        }
    }

    _search = (e) => {
         e.preventDefault();
        var value = e.target.value
        if (e.target.charCode == 13) {
            alert('Enter clicked!!!');
        }
        const path = `/search?for=${this.state.value}`
        browserHistory.push(path)
    }
    _updateValue= (e) => {
        this.setState({
            value: e.target.value
        },)
    }
    render() {
        return (
            <Grid>
                <h2>
                    <span> Le Chant d'Espérance</span>
                </h2>
                <Row>
                    <SearchBar onSubmit={(e) => this._search(e)} value={this.state.value} onChange={(e) => {this._updateValue(e)}}/>
                </Row>
                <Row>
                    <Col md={10} mdOffset={1} >
                        <Row>
                            <Col xs={6}>
                                <NavLink to="/songs/ce">
                                    <img src="/images/ce.png" style={{ maxWidth: 60 }} />
                                    <h5>Chant d'Esperance</h5>
                                </NavLink>
                            </Col>
                            <Col xs={6}>
                                <NavLink to="/songs/mj">
                                    <img src="/images/mj.png" style={{ maxWidth: 60 }} />
                                    <h5>Mélodies Joyeuses</h5>
                                </NavLink>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <NavLink to="/songs/ee">
                                    <img src="/images/ee.png" style={{ maxWidth: 60 }} />
                                    <h5>Échos des Élus</h5>
                                </NavLink>
                            </Col>
                            <Col xs={6}>
                                <NavLink to="/songs/vr">
                                    <img src="/images/vr.png" style={{ maxWidth: 60 }} />
                                    <h5>La Voix du Réveil</h5>
                                </NavLink>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <NavLink to="/songs/hc">
                                    <img src="/images/hc.png" style={{ maxWidth: 60 }} />
                                    <h5>Haiti Chante avec Radio-Lumière</h5>
                                </NavLink>
                            </Col>
                            <Col xs={6}>
                                <NavLink to="/songs/rn">
                                    <img src="/images/rn.png" style={{ maxWidth: 60 }} />
                                    <h5>Réveillons-Nous</h5>
                                </NavLink>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <NavLink to="/songs/ga">
                                    <img src="/images/ga.png" style={{ maxWidth: 60 }} />
                                    <h5>Gloire à l'Agneau</h5>
                                </NavLink>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        )
    }
}
