define(function(require, exports, module) {
	// 依赖过滤器和样式
	require('./home.css')
	require('./items.css')
	require('filter/filter')
	// 第二步 定义组件类
	module.exports = {
		template: '#tpl_home',
		// 绑定数据
		data: function() {
			// 返回绑定的数据
			return {
				// 通过闭包创建
				types: [
					{id: '1', img: '01.png', text: '美食'},
					{id: '2', img: '02.png', text: '电影'},
					{id: '3', img: '03.png', text: '酒店'},
					{id: '4', img: '04.png', text: '休闲'},
					{id: '5', img: '05.png', text: '外卖'},
					{id: '6', img: '06.png', text: 'ktv'},
					{id: '7', img: '07.png', text: '周边游'},
					{id: '8', img: '08.png', text: '丽人'},
					{id: '9', img: '09.png', text: '小吃'},
					{id: '10', img: '10.png', text: '火车票'}
				],
				// 绑定请求的数据
				ad: [],
				list: []
			}
		},
		// 页面加载完成，请求数据
		created: function() {
			// 请求数据
			this.$http.get('data/home.json')
				.then(function(res) {
				// 请求成功，将异步数据存储，
				if (res.data.errno === 0) {
					// 存储数据, 作用域不是实例化对象，要缓存this
					this.ad = res.data.data.ad;
					this.list = res.data.data.list;
				}
			})
		}
	}
})