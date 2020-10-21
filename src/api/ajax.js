import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data={}, type='GET') {

    return new Promise((resolve, reject) => {
        let promise 
        //1.执行ajax请求
        if (type === 'GET') {
            promise = axios.get(url, {
                params: {
                    data
                }
            })
        } else {
            promise = axios.post(url, data)
        }
        //2.成功了，调用resolve(value)
        promise.then(response => {
        //异步得到resolve(response.data)
            resolve(response)
        //3.失败了，提示异常信息
        }).catch(error => {
            message.error(error.message)
        })
    })

    
}

// ajax('/login',{username:'123',password:'123'}, 'POST').then()

// ajax('/manage/user/add',{username:'123',password:'123',phone:'123456879'}, 'POST').then()