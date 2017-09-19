import React from 'react'
import { Row, Col } from 'antd'
import SearchBar from '../components/SearchBar'
import Link from 'found/lib/Link'
import ReactPaginate from 'react-paginate'
import classNames from 'classnames'
import { Form } from 'antd'
import algoliasearch from 'algoliasearch'
const algoliaClient = algoliasearch('NHHUYDVI5X', '3ea876b1f721606adb66a7288662b4fe', {
    timeout: 5000
});

export default class Search extends React.Component {

    constructor(props) {
        super(props)

        console.log(props)
        this.state = {
            index: props.algoliaClient.initIndex('cesperance'),
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
        e.preventDefault()
        const value = e.target.value

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
                    <Link to={`/songs/${obj.book.abbrv.toLowerCase()}/id/${obj._id['$oid']}`}>
                        <h4>
                            <span className='search-result-title' dangerouslySetInnerHTML={{ __html: `${obj._highlightResult.title.value}` }} ></span>
                        </h4>
                    </Link>
                    <span className='ref'>{`${obj.num} ${obj.book.name} - ${lang}`}</span>
                    <div className='search-result-snippet'> <p dangerouslySetInnerHTML={{ __html: `${obj._snippetResult.lyrics.value}` }}></p></div>
                </div>

            )
        })
    }

    render() {
        return (
            <div>
                <Row >
                    <Col md={{ span: 12, offset: 6 }} xs={{ span: 20, offset: 2 }} className='search-container'>
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
                </Row >
            </div >
        )
    }
}
