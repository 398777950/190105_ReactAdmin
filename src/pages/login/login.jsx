import React, { Component } from 'react'
import './login.css'
import './images/bd.jpg'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

// const Item = Form.Item

    class login extends Component {
        constructor(props) {
            super(props);
            this.state = {

            };
        }

        onFinish = values => {
            console.log('Received values of form: ', values);
        };
        


        render() {
            return (
                <div className="login">
                    <header className="login-header">
                        <h2>React 后台管理系统</h2>
                    </header>
                    <section className="login-content">
                        <h2>用户登录</h2>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            // onSubmit = { this.handleSubmit }
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    { required: true, whitespace: true, message: '请输入用户名' },
                                    { min: 4, message: '用户名最少4位数' },
                                    { max: 12, message: '用户名最多12位数' },
                                    { pattern: /^[a-zA-Z0-9]+$/, message: '用户名必须是英文、数字、下划线' },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </section>
                </div>
            );
        }
    }

    export default login;