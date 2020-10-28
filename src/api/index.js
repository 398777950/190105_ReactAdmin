import { message } from 'antd'
import jsonp from 'jsonp'
import ajax from './ajax'

// export function reqLogin(username,password) {
//     return ajax('/login', {username,password}, 'POST')
// }

// const BASE = 'http://localhost:5000'
const BASE = ''
//登录
export const reqLogin = (username, password) => ajax(BASE + '/login', {
    username,
    password
}, 'POST')

//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')

//获取一级二级分类列表
export const reqCategorys = (parentId) => ajax(BASE + 'manage/category/list', {parentId})

//添加分类
export const reqAddCategory = (parentId,categoryName) => ajax(BASE + 'manage/category/add', {parentId,categoryName})

//更新分类
export const reqUpdateCategory = ({parentId,categoryName}) => ajax(BASE + 'manage/category/update', {parentId,categoryName})

//获取天气
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (error, data) => {
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