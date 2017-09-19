import React from 'react'
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;
import classNames from 'classnames'
class SearchBarForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { placeholder: props.placeholder ? this.props.placeholder : 'Search', }
    }
    render() {
        const formClass = classNames('search-bar', this.props.formClass)
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='search-bar'>
                <Input
                    placeholder={this.state.placeholder}
                    onPressEnter={(e) => this.props.onSubmit(e)}
                    onChange={this.props.onChange}
                />

            </div>
        )
    }
}

const SearchBar = Form.create()(SearchBarForm);
export default SearchBar