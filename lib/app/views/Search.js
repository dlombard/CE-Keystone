import React from 'react'
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import SearchBar from '../components/SearchBar'
import NavLink from '../components/NavLink'
import ReactPaginate from 'react-paginate'
import _ from 'lodash'
import classNames from 'classnames'
import algoliasearch from 'algoliasearch'
const algoliaClient = algoliasearch('NHHUYDVI5X', '3ea876b1f721606adb66a7288662b4fe', {
    timeout: 5000
});

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
        if (this.props.location.query.for) {
            this.state.index.search(this.props.location.query.for, { 'hitsPerPage': 10, 'page': 0 }).then((content) => {
                this.setState({
                    data: content.hits,
                    nbHits: content.nbHits,
                    nbPages: content.nbPages,
                    page: content.page,
                    processingTimeMS: content.processingTimeMS
                })
            })
        }


    }
    _fetchSearchResults = (hitsPerPage) => {
        this.state.index.search(this.state.value, { hitsPerPage, page: this.state.page }).then((content) => {
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
        this._fetchSearchResults(10)
    }
    _handlePageClick = (data) => {
        this.setState({
            page: data.selected
        }, () => this._fetchSearchResults(10))
    }
    _renderSongs = () => {
        return this.state.data.map((obj) => {
            var lang = (obj.language === 'ht') ? 'Kreyol' : 'Français'
            return (
                <div className={classNames('search-result')}>
                    <NavLink to={`/search/${obj._id['$oid']}`}>
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
                        <Row>
                            <ReactPaginate previousLabel={"previous"}
                                nextLabel={"next"}
                                breakLabel={<a href="">...</a>}
                                breakClassName={"break-me"}
                                pageCount={this.state.nbPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this._handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"} />
                        </Row>
                    </Col>
                    <Col md={3}>
                    </Col>
                </Row >
            </Grid >
        )
    }
}
