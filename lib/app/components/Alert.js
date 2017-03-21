import React from 'react'
import { Alert } from 'react-bootstrap'

export default class CeAlert extends React.Component {
    constructor(props) {
        super(props)

    }

    _renderAlert = () => {

        return <Alert >
            <span>{this.props.message}</span>
        </Alert>
    }
    render() {
        return (
            <div>
                {this._renderAlert()}
            </div>
        )
    }
}
