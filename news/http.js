// const BASE_URL = 'https://yapi.rietergroup.com/mock/67/glyxsd'
const BASE_URL = 'http://localhost:4000/api/wx'

// 封装请求
const http = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			success: (res) => {
				if (res.statusCode !== 200) {
					return uni.showToast({
						title: '请求接口异常',
						icon: 'none'
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: '请求接口失败'
				})
				reject(err)
			}
		})
	})
}
const sendMsg = (options) => {
	//消息通知授权
	wx.requestSubscribeMessage({
		tmplIds: options.list || [],
		success(res) {
			console.log(res);
		},
		fail(res) {
			console.log(res);
		},
		complete(res) {
			console.log(res);
		}
	})
}

export default http
