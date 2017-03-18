import React from 'react'
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import SearchBar from '../components/SearchBar'
import NavLink from '../components/NavLink'
import algoliasearch from 'algoliasearch'
const algoliaClient = algoliasearch('NHHUYDVI5X', '3ea876b1f721606adb66a7288662b4fe');
import _ from 'lodash'
import classNames from 'classnames'
export default class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            index: algoliaClient.initIndex('cesperance'),
            value: (props.location.query.for) ? props.location.query.for : '',
            data: [],
            nbHits: 0,
            nbPages: 1,
            page: 0,
            processingTimeMS: 0

        }
    }
    componentDidMount() {

        this.state.index.search(this.props.location.query.for, { 'hitsPerPage': 10 }).then((content) => {
            this.setState({
                data: content.hits,
                nbHits: content.nbHits,
                nbPages: content.nbPages,
                page: content.page,
                processingTimeMS: content.processingTimeMS
            })
        })

    }
    _search = (e) => {
        e.preventDefault
        var value = e.target.value
        this.setState({
            value
        })
        this.state.index.search(value, { 'hitsPerPage': 10 }).then((content) => {
            this.setState({
                data: content.hits,
                nbHits: content.nbHits,
                nbPages: content.nbPages,
                page: content.page,
                processingTimeMS: content.processingTimeMS
            })
        })
    }
    _renderSongs = () => {
        return this.state.data.map((obj) => {
            var lang = (obj.language === 'ht') ? 'Kreyol' : 'Français'
            return (
                <div className={classNames('search-result')}>
                    <NavLink to={`/songs/${_.lowerCase(obj.book.abbrv)}/${obj._id['$oid']}`}>
                        <h4>
                            <span className='search-result-title' dangerouslySetInnerHTML={{ __html: `${obj._highlightResult.title.value}` }} ></span>
                        </h4>


                    </NavLink>
                    <span className='ref'> - {`${obj.num} ${obj.book.name} ${lang}`}</span>
                    <div className='search-result-snippet'> <p dangerouslySetInnerHTML={{ __html: `${obj._snippetResult.lyrics.value}` }}></p></div>
                </div>

            )
        })
    }

    render() {
        return (
            <Grid>
                <Row >
                    <Col md={9} sm={12} className='search-container'>
                        <Row>
                            <SearchBar style={{ width: '100%' }} onSubmit={(e) => this._search(e)} value={this.state.value} onChange={(e) => { this._search(e) }} />
                        </Row>
                        <Row>
                            <span className='result-stats'>{`${this.state.nbHits} results found in ${this.state.processingTimeMS} ms`}</span>
                        </Row>
                        <Row className='search-results'>
                            {this._renderSongs()}
                        </Row>
                    </Col>
                    <Col md={3}>
                    </Col>
                </Row >
            </Grid >
        )
    }
}
