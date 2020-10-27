import { message } from 'antd'
import jsonp from 'jsonp'
import ajax from './ajax'

// export function reqLogin(username,password) {
//     return ajax('/login', {username,password}, 'POST')
// }

// const BASE = 'http://localhost:5000'
const BASE = ''

export const reqLogin = (username, password) => ajax(BASE + '/login', {
    username,
    password
}, 'POST')

export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')

export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (error, data) => {
            console.log(data)
            if (!error && data.status === 'success') {
                const {dayPictureUrl,weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather})
            } else {
                message.error('获取天气信息失败')
            }
        })
    })
}
// reqWeather('北京')