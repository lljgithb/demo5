define(function(require, exports, module) {
	// 样式和过滤器
	require('./detail.css')
	require('filter/filter')
	module.exports = {
		// 定义模板
		template: '#tpl_detail',
		// 绑定数据
		data: function() {
			return {
				// 绑定数据
				data: {}
			}
		},
		// 请求数据
		created: function() {
			// 发送请求
			this.$http.get('data/product.json?id=' + this.$route.params.id)
				.then(function(res) {
				// 请求成功，存储数据
				if (res.data.errno === 0) {
					this.data = res.data.data;
				}
			})
		}
	}
})