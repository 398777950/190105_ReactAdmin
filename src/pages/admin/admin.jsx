import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect, Route, Switch} from "react-router-dom";
import { Layout } from 'antd';
import Header from '../../components/header'
import LeftNav from '../../components/left-nav/leftnav'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

import './admin.css'


const { Footer, Sider, Content } = Layout;

class admin extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const user = memoryUtils.user
        if (!user || !user._id) {
            return <Redirect to='/login' />
        }
        return (
                <Layout style={{minHeight: '100vh' }}>
                    <Sider>
                        <LeftNav></LeftNav>
                    </Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content style={{backgroundColor:'white'}}>
                            <Switch>
                                <Route path='/home' component={Home}></Route>
                                <Route path='/category' component={Category}></Route>
                                <Route path="/product" component={Product}></Route>
                                <Route path="/role" component={Role}></Route>
                                <Route path="/user" component={User}></Route>
                                <Route path="/charts/bar" component={Bar}></Route>
                                <Route path="/charts/line" component={Line}></Route>
                                <Route path="/charts/pie" component={Pie}></Route>
                                {/* <Redirect to="/home"></Redirect> */}
                            </Switch>
                        </Content>
                        <Footer style={{textAlign:'center',color:'#ccccc'}}>推荐使用谷歌浏览器，可以获得更多体验</Footer>
                    </Layout>
                </Layout>
        );
    }
}

export default admin;