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
                    <Col md={9}>
                        <h2>
                            <span> Le Chant d'Espérance</span>
                        </h2>

                    </Col>
                </Row>
                <Row>

                    <Col md={9} sm={12}>

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
                    <Col md={3} className='side-bar-2'>
                        <div className='most-viewed'>
                            <span className='most-viewed-title'>Most Viewed Songs</span>
                            <MostViewedList
                                viewer={this.props.viewer}
                                sortField={this.props.relay.variables.sortField}
                            />
                        </div>
                    </Col>
                </Row >
                <Row>
                    <Col md={12} xsHidden className='ad-banner'>
                        <img src="http://placehold.it/728x90" />
                    </Col>
                    <Col sm={12} smHidden mdHidden lgHidden className='ad-banner'>
                        <img src="http://placehold.it/300x250" />
                    </Col>
                </Row>
            </Grid >
        )
    }
}

export default Relay.createContainer(Home,
    {
        initialVariables: { sortField: "-meta.totalViews", first: 5 },
        prepareVariables: (prevVariables) => {
            return { sortField: prevVariables.sortField, first: prevVariables.first }

        },
        fragments: {

            viewer: (variables) => Relay.QL`
                                    fragment on Viewer {


                    ${MostViewedList.getFragment('viewer', { sortField: variables.sortField })}

                                
                    }`

        }
    }
)

/*
viewer: () => Relay.QL`
                                    fragment on Viewer {

                    songs(sortField: $sortField, first:5){
                    edges{
                node{
                    id
                                        title
                num
                book{
                    name
                }
                meta{
                    totalViews
                    stats{
                        views
                        week
                        day
                        year
                    }
                }
                                    }
                                }
                            }
                    }`

*/