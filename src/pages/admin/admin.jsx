import React ,{Component} from 'react'
import memoryUtils from '../../utils/memoryUtils'
import {Redirect} from "react-router-dom";

class admin extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const user = memoryUtils.user
        if(!user || !user._id) {
            return <Redirect to='/login'/>
        }
        return (
            <div>
                Hello {user.username}
            </div>
        );
    }
}

export default admin;