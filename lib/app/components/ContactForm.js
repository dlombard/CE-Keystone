import React, { PureComponent } from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const { TextArea } = Input
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CeAlert from './Alert'
class Contact extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      alertVisible: false,
    }
  }

  _handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const payload = {
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message
        }
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
                this.setState({ alertVisible: false }, () => {
                  this.props.router.push('/')
                });
              }, 2500);
            });
            return
          }).
          catch((err) => {
            console.error(err)
          })
      }
    });
  }

  render() {

    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 20, offset: 2 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20, offset: 2 },
        sm: { span: 18 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 24
        },
      },
    }

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));


    return (
      <div>
        <Row>
          <Form onSubmit={(e) => this._handleSubmit(e)} layout="vertical" className='contact-form'>
            <FormItem
              label="Name"
              hasFeedback>

              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your name.' }],
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Name" />
                )}
            </FormItem>
            <FormItem
              label="E-mail"
              hasFeedback
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'The input is not valid E-mail!',
                }, {
                  required: true, message: 'Please input your E-mail!',
                }],
              })(
                <Input placeholder="Email" />
                )}
            </FormItem>
            <FormItem
              label="Subject"
              hasFeedback>

              {getFieldDecorator('subject', {
                rules: [{ required: true, message: 'Please input the subject of your message.' }],
              })(
                <Input placeholder="Subject" />
                )}
            </FormItem>
            <FormItem
              label="Message"
              hasFeedback>
              {getFieldDecorator('message', {
                rules: [{ required: true, message: 'Please input your message.' }],
              })(
                <TextArea rows={6} placeholder="Message..." />
                )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">Send</Button>
            </FormItem>
          </Form>
        </Row>
        <Row>
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
          >
            <div >
              {this.state.alertVisible ? <CeAlert className="contact-alert" message="Email Sent!">
              </CeAlert> : null}
            </div>
          </ReactCSSTransitionGroup>

        </Row>
      </div>
    )
  }
}

const WrappedContactForm = Form.create()(Contact);
class ContactForm extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const props = this.props

    return (
      <div>
        <WrappedContactForm {...props} />
      </div>
    )
  }
}

export default ContactForm