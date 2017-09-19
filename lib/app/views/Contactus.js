import React from 'react'
import { Button, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap'
import { Row, Col } from 'antd'
import CeAlert from '../components/Alert'
import ContactForm from '../components/ContactForm'

export default class Contactus extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            subject: '',
            comment: '',
            alertVisible: false,
        }
    }
    onChangeName = (e) => {
        e.preventDefault()
        this.setState({
            name: e.target.value
        })
    }
    onChangeEmail = (e) => {
        e.preventDefault()
        this.setState({
            email: e.target.value
        })
    }
    onChangeSubject = (e) => {
        e.preventDefault()
        this.setState({
            subject: e.target.value
        })
    }
    onChangeComment = (e) => {
        e.preventDefault()
        this.setState({
            comment: e.target.value
        })
    }
    submitForm = (e) => {
        e.preventDefault()
        const payload = {
            name: this.state.name,
            email: this.state.email,
            subject: this.state.subject,
            comment: this.state.comment,
        };

        fetch('/contact-us', {
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then((res) => {
            return res.json()
        }).
            then((json) => {
                this.setState({
                    alertVisible: true,
                    name: '',
                    email: '',
                    subject: '',
                    comment: '',
                }, () => {
                    setTimeout(() => {
                        this.setState({ alertVisible: false });
                    }, 2500);
                });
            }).
            catch((err) => {
                console.error(err)
            })
    }
    handleRedirect = (res) => {
        if (res.status === 200) {

            // redirect here
            // window.location.href = 'http://localhost:300/redirect';
        } else {
            // Something went wrong here
        }
    }

    render() {
        return (

            <div>
                <Row>
                    <Col md={{ span: 20, offset: 2 }} xs={{span: 22, offset:1}}>
                        <Row className='title'>
                            <Col md={{ span: 16, offset: 4 }}>
                                <h1 >Get in touch</h1>
                                <p>You have a question? You have suggestions for us? Send us a note by filling the form below!</p>
                            </Col>
                        </Row>
                        <Row className="contact-us" >
                            <Col md={{ span: 14, offset: 5 }}>
                                <ContactForm />
                            </Col>
                        </Row>
                        <Row>
                            {this.state.alertVisible ? <CeAlert className="contact-alert" message="Email Sent!">
                            </CeAlert> : null}
                        </Row>
                    </Col>
                </Row>
            </div>

        )
    }
}
