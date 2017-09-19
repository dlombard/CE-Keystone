import React from 'react'
import Link from 'found/lib/Link'
import { Row, Col, Layout, Menu, Icon, Button } from 'antd';
import SearchBar from '../components/SearchBar'
import algoliasearch from 'algoliasearch'
import { browserHistory } from 'react-router'
const algoliaClient = algoliasearch('NHHUYDVI5X', '3ea876b1f721606adb66a7288662b4fe', {
    timeout: 5000
});

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
        this.props.router.push(path)
    }
    _updateValue = (e) => {
        this.setState({
            value: e.target.value
        }, )
    }
    _renderMostViewed = () => {

        return this.props.viewer.songs.edges.map(({ node }) => {
            return (
                <p>{node.id}</p>
            )
        })

    }
    render() {
        return (
            <div>
                <Row>
                    <Col className="home-main-content">

                        <Row>
                            <Col md={{ span: 12, offset: 6 }} xs={{ span: 20, offset: 2 }}>
                                <SearchBar onSubmit={(e) => this._search(e)} value={this.state.value} onChange={(e) => { this._updateValue(e) }} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 14, offset: 5 }} sm={{ span: 20, offset: 2 }} >
                                <Row>
                                    <Col xs={12} className="book-icon">
                                        <Link to="/songs/ce">
                                            <img src="/images/ce.png" />
                                            <h3>Chant d'Espérance</h3>
                                        </Link>
                                    </Col>
                                    <Col xs={12} className="book-icon">
                                        <Link to="/songs/mj">
                                            <img src="/images/mj.png" />
                                            <h3>Mélodies Joyeuses</h3>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} className="book-icon">
                                        <Link to="/songs/ee">
                                            <img src="/images/ee.png" />
                                            <h3>Échos des Élus</h3>
                                        </Link>
                                    </Col>
                                    <Col xs={12} className="book-icon">
                                        <Link to="/songs/vr">
                                            <img src="/images/vr.png" />
                                            <h3>La Voix du Réveil</h3>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} className="book-icon">
                                        <Link to="/songs/hc">
                                            <img src="/images/hc.png" />
                                            <h3>Haïti Chante avec Radio-Lumière</h3>
                                        </Link>
                                    </Col>
                                    <Col xs={12} className="book-icon">
                                        <Link to="/songs/rn">
                                            <img src="/images/rn.png" />
                                            <h3>Réveillons-Nous</h3>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} className="book-icon">
                                        <Link to="/songs/ga">
                                            <img src="/images/ga.png" />
                                            <h3>Gloire à l'Agneau</h3>
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                    </Col>
                </Row >
            </div >
        )
    }
}