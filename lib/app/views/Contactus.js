import React from 'react'
import { Button, Grid, Row, Col, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import CeAlert from '../components/Alert'

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
            browserHistory.push("/")
            // redirect here
            // window.location.href = 'http://localhost:300/redirect';
        } else {
            // Something went wrong here
        }
    }

    render() {
        return (

            <Grid>
                <Row>
                    <Col sm={8} smOffset={2} xs={12}>
                        <Row>
                            <h1>Get in touch</h1>
                            <p>You have a question? You have suggestions for us? Send us a note by filling the form below!</p>
                        </Row>
                        <Row className="contact-us" >
                            <Form onSubmit={this.submitForm}>
                                <FormGroup
                                    id="formControlsText">
                                    <ControlLabel style={{ textAlign: 'left' }}>Name</ControlLabel>
                                    <FormControl
                                        type="text"
                                        placeholder="Name"
                                        onChange={this.onChangeName}
                                        value={this.state.name}
                                    />
                                </FormGroup>

                                <FormGroup
                                    id="formControlsEmail">
                                    <ControlLabel>Email</ControlLabel>
                                    <FormControl
                                        type="email"
                                        placeholder="Email"
                                        onChange={this.onChangeEmail}
                                        value={this.state.email} />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Subject</ControlLabel>
                                    <FormControl
                                        type="text"
                                        placeholder="Subject ..."
                                        onChange={this.onChangeSubject}
                                        value={this.state.subject} />
                                </FormGroup>
                                <FormGroup controlId="formControlsTextarea">
                                    <ControlLabel>Comment</ControlLabel>
                                    <FormControl
                                        type="textarea"
                                        componentClass="textarea"
                                        placeholder="Comments ..."
                                        onChange={this.onChangeComment} value={this.state.comment}
                                    />
                                </FormGroup>

                                <Button type="submit" className="button-primary" style={{ float: 'right' }}>
                                    Submit
                             </Button>
                            </Form>
                        </Row>
                        <Row>
                            {this.state.alertVisible ? <CeAlert className="contact-alert" message="Email Sent!">
                            </CeAlert> : null}
                        </Row>
                    </Col>
                </Row>
            </Grid>

        )
    }
}
