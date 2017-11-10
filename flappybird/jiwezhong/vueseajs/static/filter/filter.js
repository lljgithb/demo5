define(function(require, exports, module) {
	// 定义过滤器
	Vue.filter('price', function(value) {
		return value + '元';
	})
	Vue.filter('originPrice', function(value) {
		return '门市价:' + value + '元';
	})
	Vue.filter('sales', function(value) {
		return '销量' + value;
	})
})