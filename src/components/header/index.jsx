import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Breadcrumb, Modal } from 'antd'
import './index.css'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import { reqWeather } from '../../api/index'
import menuList from '../../config/menuConfig'
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../link-button'


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: formateDate(Date.now()),//当前时间
            dayPictureUrl: '',
            weather: '',
            ModalText: '确认退出登录？',
            visible: false,
            confirmLoading: false,
        };
    }

    getTime = () => {
        this.IntervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({ currentTime })
        }, 1000)
    }

    getWeather = async () => {
        const { dayPictureUrl, weather } = await reqWeather('昆明')
        this.setState({
            dayPictureUrl,
            weather
        })
    }

    getTitle = () => {
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }


    //退出登录
    logout = () => {
        this.setState({
            visible: true,
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 500);
        storageUtils.removeUser()
        memoryUtils.user = {}
        this.props.history.replace('/login')
    };

    //第一次render()之后执行一次
    componentDidMount() {
        this.getTime()
        this.getWeather()
    }

    //当前组件卸载之前调用
    componentWillUnmount() {
        //清楚定时器
        clearInterval(this.IntervalId)
    }


    render() {
        const { currentTime, dayPictureUrl, weather } = this.state

        const username = memoryUtils.user.username

        const title = this.getTitle()

        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎! {username}</span>
                    <LinkButton style={{cursor: 'pointer', color: 'blue'}} onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-right">
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <a href="/home">·{title}</a>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="header-bottom-left">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather"></img>
                        <span>{weather}</span>
                    </div>
                    {/* 对话框 */}
                    <Modal
                        title="Title"
                        visible={visible}
                        onOk={this.handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={this.handleCancel}
                        >
                    <p>{ModalText}</p>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);