import React, { Component } from 'react'
import './login.css'
import './images/bd.jpg'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Redirect} from "react-router-dom";
import {reqLogin} from '../../api/index.js'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
// const Item = Form.Item

    class login extends Component {
        constructor(props) {
            super(props);
            this.state = {

            };
        }

        onFinish = values => {
            const {username,password} = values
            reqLogin(username,password).then(async response => {
                const res = await response.data
                if(res.status === 0){
                    message.success('登录成功！');
                    const user = res.data
                    //保存内存中
                    memoryUtils.user = user
                    //保存storage中
                    storageUtils.saveUser(user)
                    this.props.history.replace('/admin')
                } else {
                    message.error('登录失败，请检查用户名和密码！');
                }
            })
        };
        


        render() {
            const user = memoryUtils.user
            if(user && user._id) {
                return <Redirect to='/admin'/>
            }
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