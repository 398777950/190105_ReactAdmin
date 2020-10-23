import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './index.css'
import logo from '../../assets/images/logo.jpg'
import menuList from '../../config/menuConfig'
import { Menu } from 'antd';
import {
    AppstoreOutlined,
    PieChartOutlined,
    MailOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if(!item.chlidren){
                return (
                    <Menu.Item key={item.key} icon={<item.icon />}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                )
            }else {
                return (
                    <SubMenu key={item.key} icon={<item.icon />} title={item.title}>
                        {this.getMenuNodes(item.chlidren)}
                    </SubMenu>
                )
            }
        })
    }

    // getMenuNodes = (menuList) => {
    //     return menuList.reduce((pre, item) => {
    //         if(item.chlidren) {
    //             pre.push((
    //                 <Menu.Item key={item.key} icon={<item.icon />}>
    //                     <Link to={item.key}>{item.title}</Link>
    //                 </Menu.Item>
    //             ))
    //         } else {
    //             pre.push((
    //                 <SubMenu key={item.key} icon={<item.icon />} title={item.title}>
    //                     {this.getMenuNodes(item.chlidren)}
    //                 </SubMenu>
    //             ))
    //         }
    //         return pre
    //     }, [])
    // }

    render() {

        // const path = this.props.location.pathname

        return (
            <div className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="logo"></img>
                    <h1>React 后台管理</h1>
                </Link>
                <Menu
                    defaultSelectedKeys={[path]}
                    defaultOpenKeys={[path]}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    {/* <Menu.Item key="/home" icon={<PieChartOutlined />}>
                        <Link to='/home'>首页</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
                        <Menu.Item key="/category" icon={<PieChartOutlined />}><Link to='/category'>品类管理</Link></Menu.Item>
                        <Menu.Item key="/product" icon={<PieChartOutlined />}><Link to='/product'>商品管理</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/user" icon={<PieChartOutlined />}>
                        <Link to='/user'>用户管理</Link>
                    </Menu.Item>
                    <Menu.Item key="/role" icon={<PieChartOutlined />}>
                        <Link to='/role'>角色管理</Link>
                    </Menu.Item>
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="图形管理">
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                    </SubMenu> */}
                    {
                        this.getMenuNodes(menuList)
                    }
                </Menu>
            </div>
        );
    }
}

export default index;
