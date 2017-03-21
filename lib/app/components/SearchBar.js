import React from 'react'
import { Form, FormGroup, FormControl } from 'react-bootstrap'
import classNames from 'classnames'
export default class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = { placeholder: 'Search' }
    }
    render() {
        const formClass = classNames('search-bar', this.props.formClass)

        return (
            <div>
                <Form className={formClass} style={this.props.style} onSubmit={this.props.onSubmit}>
                    <FormGroup>
                        <FormControl type="text" placeholder={this.props.placeholder || this.state.placeholder} onChange={this.props.onChange} value={this.props.value}/>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}