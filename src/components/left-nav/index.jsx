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


class LeftNav extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.chlidren) {
                return (
                    <Menu.Item key={item.key} icon={<item.icon />}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                )
            } else {
                const path = this.props.location.pathname
                const cItem = item.chlidren.find(cItem => cItem.key === path)
                if (cItem) {
                    this.openKey = item.key
                }


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
    // const path = this.props.location.pathname
    // const cItem = item.chlidren.find(cItem => cItem.key === path)
    // if(cItem) {
    //     this.openKey = item.key
    // }
    //             pre.push((
    //                 <SubMenu key={item.key} icon={<item.icon />} title={item.title}>
    //                     {this.getMenuNodes(item.chlidren)}
    //                 </SubMenu>
    //             ))
    //         }
    //         return pre
    //     }, [])
    // }

    //第一次render()之前执行一次，为第一次render（）准备数据，同步的
    componentWillMount() {
        this.getMenuNodes(menuList)
    }

    render() {
        this.getMenuNodes(menuList)
        const path = this.props.location.pathname
        const openKey = this.openKey

        // console.log(path)  当前路由

        return (
            <div className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="logo"></img>
                    <h1>React 后台管理</h1>
                </Link>
                <Menu
                    defaultSelectedKeys={[path]}
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                // inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="/home" icon={<PieChartOutlined />}>
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
                        <Menu.Item key="/charts/bar" icon={<PieChartOutlined />}><Link to='/charts/bar'>柱状图</Link></Menu.Item>
                        <Menu.Item key="/charts/line" icon={<PieChartOutlined />}><Link to='/charts/line'>折线图</Link></Menu.Item>
                        <Menu.Item key="/charts/pie" icon={<PieChartOutlined />}><Link to='/charts/pie'>饼状图</Link></Menu.Item>
                    </SubMenu>


                    {/* {
                        this.menuNodes
                    } */}
                </Menu>
            </div>
        );
    }
}
// withRouter高阶组件
//包装非路由组件，返回一个新的组件
//新的组件向非路由组件传递3个属性：history、loaction、match

export default withRouter(LeftNav);
