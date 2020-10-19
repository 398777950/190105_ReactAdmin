import React ,{Component} from 'react'

import './login.css'
import './images/bd.jpg'

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div className="login">
                <header className="login-header">
                    <h2>React 后台管理系统</h2>
                </header>
                <section className="login-content">

                </section>
            </div>
        );
    }
}

export default login;