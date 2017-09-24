import React from 'react'
import { Row, Col } from 'antd'
import ContactForm from '../components/ContactForm'

export default class Contactus extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const props = this.props
        return (

            <div>
                <Row>
                    <Col md={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
                        <Row className='title'>
                            <Col md={{ span: 16, offset: 4 }}>
                                <h1 >Get in touch</h1>
                                <p>You have a question? You have suggestions for us? Send us a note by filling the form below!</p>
                            </Col>
                        </Row>
                        <Row className="contact-us" >
                            <Col md={{ span: 14, offset: 5 }}>
                                <ContactForm {...props} />
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </div>

        )
    }
}
