/**
 * Created on 2017/5/2.
 * 该文件主要用于请求数据的公用方法
 */

//包引入
import axios from 'axios';
import qs from 'qs';
import cache from 'utils/cache'

axios.defaults.timeout = 5000;
process.env.NODE_ENV == 'production' && (axios.defaults.baseURL = 'http://www.hellodoctor.com.cn');

/**
 *  目前有用到的就这两中方法 post get 
 *  如果后面有需求可以继续封装方法api
 *  具体api 可查询下面地址
 *  https://github.com/mzabriskie/axios
 *  
 */


var http = {
	post: function(setting){
		return  axios({
		            method: 'post',
		            url: setting.url,
		            data: qs.stringify(setting.data || {}),
		            headers: {
		            	'X-Requested-With': 'XMLHttpRequest',
		                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		                'adminToken' : cache.readToken('adminToken') || ''
		            }
		        })
				.then(function(res){
					typeof setting.success == 'function' && setting.success(res)
				})
				.catch(function(res){
					typeof setting.error == 'function' && setting.error(res)
				})
		
	},
	//TODO 目前 post 和 get 就method不一样,但是还是把他们抽成两个方法 
	//后面会根据项目具体情况再次封装
	get: function(setting) {
		return  axios({
		            method: 'get',
		            url: setting.url,
		            params: setting.data || {},
		            headers: {
		                'X-Requested-With': 'XMLHttpRequest',
		                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		                'adminToken' : cache.readToken('adminToken') || ''
		            }
		        })
				.then(function(res){
					typeof setting.success == 'function' && setting.success(res)
				})
				.catch(function(res){
					typeof setting.error == 'function' && setting.error(res)
				})
	},
	ajax: function(setting){
		$.ajax({
	            type: 'post',
	            url: setting.url,
	            data: setting.data || {},
	            beforeSend: function (request) {
                    request.setRequestHeader("adminToken", cache.readToken('adminToken') || '');
                },
                success: function (res) {
                    typeof setting.success == 'function' && setting.success(res)
                    
                },
                error: function (res) {
                    typeof setting.success == 'function' && setting.success(res)
                }
            })
		
	},
}
// "Content-Type": "application/json"
// "Content-Type": "application/x-www-form-urlencoded" // 适用于大部分情况
// "Content-Type": "multipart/form-data" // 适用于文件上传
// var params = new URLSearchParams();
// params.append('title', 'titlecontent');
// axios.post("url", params).then( (response) => {
//     console.log(response.data)
// })
exports.install = function (Vue, options) { 
    Vue.prototype.$http = http
}