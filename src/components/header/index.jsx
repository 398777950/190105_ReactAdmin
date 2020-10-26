import React, { Component } from 'react'
import './index.css'


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎!</span>
                    <a href="4132">退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-right">
                        首页132133
                    </div>
                    <div className="header-bottom-left">
                        <span>2020-10-30</span>
                        <img src="https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/currentweather/day/01.png" alt="weather"></img>
                        <span>晴</span>
                    </div>

                </div>
            </div>
        );
    }
}

export default index;