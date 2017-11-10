define(function(require, exports, module) {
	// 引入三个组件
	var Home = require('components/home/home')
	var List = require('components/list/list')
	var Detail = require('components/detail/detail')
	// 定义路由规则
	var routes = [
		{
			path: '/home',
			component: Home
		},
		{
			path: '/list/:type/:id',
			component: List
		},
		{
			path: '/detail/:id',
			component: Detail
		},
		// 默认路由
		{
			path: '*',
			redirect: '/home'
		}
	]
	// 第三步 实例化路由类
	module.exports = new VueRouter({
		routes: routes
	})
})