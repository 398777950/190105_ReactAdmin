import React, { Component } from 'react'
import { Form, Input, Select } from 'antd';
const { Option } = Select;


class AddForm extends Component {

    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        
        return (
            <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                <Form.Item>
                    <Select>
                        <Option value='0'>一级分类</Option>
                        <Option value='1'>电脑</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Input placeholder="请输入分类名称"></Input>
                </Form.Item>                
            </Form>
        );
    }
}

export default AddForm;