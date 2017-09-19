import React, { PureComponent } from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const { TextArea } = Input
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class ContactForm extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      postUrl: 'https://forms.zohopublic.com/virtualoffice9505/form/ContactUs/formperma/5HCG0F_5B5F21k5KK3a1Hda6m/htmlRecords/submit',
    }
  }

  _handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
                this.setState({ alertVisible: false });
              }, 2500);
            });
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
    )
  }
}

const WrappedContactForm = Form.create()(ContactForm);
export default WrappedContactForm