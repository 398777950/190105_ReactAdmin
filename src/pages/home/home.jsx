import React, { Component } from 'react';
import './home.css'

class home extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="home">
                欢迎━(*｀∀´*)ノ亻登录后台管理系统
            </div>
        );
    }
}

export default home;