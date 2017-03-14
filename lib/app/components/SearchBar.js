import React from 'react'
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap'

export default class SearchBar extends React.Component {

    render() {
        return (
            <div>
                <Form className="search-bar">
                    <FormGroup>
                        <FormControl type="text" placeholder="Search" />
                    </FormGroup>
                </Form>
            </div>
        )
    }
}