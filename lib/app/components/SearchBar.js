import React from 'react'
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap'
import classNames from 'classnames'
export default class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            placeholder: 'Search'
        }
    }
    render() {
        var formClass = classNames('search-bar', this.props.formClass)
        return (
            <div>
                <Form className={formClass} style={this.props.style}>
                    <FormGroup>
                        <FormControl type="text" placeholder={this.props.placeholder || this.state.placeholder} />
                    </FormGroup>
                </Form>
            </div>
        )
    }
}