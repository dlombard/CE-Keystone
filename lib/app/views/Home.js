import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import SearchBar from '../components/SearchBar'
import NavLink from '../components/NavLink'
import Relay from 'react-relay'
import algoliasearch from 'algoliasearch'
import { browserHistory } from 'react-router'
import MostViewedList from '../components/MostViewedList'
const algoliaClient = algoliasearch('NHHUYDVI5X', '3ea876b1f721606adb66a7288662b4fe', {
    timeout: 5000
});

class Home extends React.Component {

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
            <Grid>
                <Row>

                    <Col md={9} sm={12} className="home-main-content">

                        <Row>
                            <SearchBar onSubmit={(e) => this._search(e)} value={this.state.value} onChange={(e) => { this._updateValue(e) }} />
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
                    </Col>
                    <Col md={3} className='sidebar-2'>
                        <div className='most-viewed'>
                            <div>
                                <h4 className='most-viewed-title'>Most Viewed Songs</h4>
                            </div>
                            <MostViewedList
                                viewer={this.props.viewer}
                                sortField={this.props.relay.variables.sortField}
                                first={this.props.relay.variables.first}
                                minTotalViews={this.props.relay.variables.minTotalViews}
                            />
                        </div>
                    </Col>
                </Row >
            </Grid >
        )
    }
}

export default Relay.createContainer(Home,
    {
        initialVariables: { sortField: "-meta.totalViews", first: 10, minTotalViews: 1 },
        prepareVariables: (prevVariables) => {
            return { sortField: prevVariables.sortField, first: prevVariables.first, minTotalViews: prevVariables.minTotalViews }

        },
        fragments: {

            viewer: (vars) => Relay.QL`
                                    fragment on Viewer {


                    ${MostViewedList.getFragment('viewer', vars)}

                                
                    }`

        }
    }
)