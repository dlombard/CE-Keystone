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
                        <Row style={{ paddingTop: 60 }}>
                            <Col md={{ span: 14, offset: 5 }} sm={{ span: 20, offset: 2 }} >
                                <Row>
                                    <Col xs={12} className="book-icon">
                                        <Link to="/songs/ce">
                                            <img src="https://res.cloudinary.com/dgpgwfwfv/image/upload/v1506218317/ce_tztsik.png" />
                                            <h3>Chant d'Espérance</h3>
                                        </Link>
                                    </Col>
                                    <Col xs={12} className="book-icon">
                                        <Link to="/songs/mj">
                                            <img src="https://res.cloudinary.com/dgpgwfwfv/image/upload/v1506218317/mj_tgmtnd.png" />
                                            <h3>Mélodies Joyeuses</h3>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} className="book-icon">
                                        <Link to="/songs/ee">
                                            <img src="https://res.cloudinary.com/dgpgwfwfv/image/upload/v1506218317/ee_xtzz3a.png" />
                                            <h3>Échos des Élus</h3>
                                        </Link>
                                    </Col>
                                    <Col xs={12} className="book-icon">
                                        <Link to="/songs/vr">
                                            <img src="https://res.cloudinary.com/dgpgwfwfv/image/upload/v1506218317/vr_xmbquk.png" />
                                            <h3>La Voix du Réveil</h3>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} className="book-icon">
                                        <Link to="/songs/hc">
                                            <img src="https://res.cloudinary.com/dgpgwfwfv/image/upload/v1506218317/hc_r19k70.png" />
                                            <h3>Haïti Chante avec Radio-Lumière</h3>
                                        </Link>
                                    </Col>
                                    <Col xs={12} className="book-icon">
                                        <Link to="/songs/rn">
                                            <img src="https://res.cloudinary.com/dgpgwfwfv/image/upload/v1506218317/rn_l31nzr.png" />
                                            <h3>Réveillons-Nous</h3>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} className="book-icon">
                                        <Link to="/songs/ga">
                                            <img src="https://res.cloudinary.com/dgpgwfwfv/image/upload/v1506218317/ga_vr2m8d.png" />
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