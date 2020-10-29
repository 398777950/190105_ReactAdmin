import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Form, Input } from 'antd';


class UpdateForm extends Component {

    static propTypes = {
        categoryName: propTypes.string.isRequired,
        // setForm: propTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = { 
            username:''
        };
    }

    
    render() {
        const {categoryName} = this.props

        return (
            
            <Form>
                <Form.Item name="username">
                    <Input onChange={this.props.toFatherValue} placeholder={categoryName} />
                </Form.Item>               
            </Form>
        );
    }
}

export default UpdateForm;