// 定义路由模块，requirejs建议使用module transports规范定义模块
define(['backbone', 'layer/layer', 'list/list', 'collection/img'], function(Backbone, Layer, List, ImageCollection) {
	// =================  1 让集合暴露接口， 2 要为视图添加集合实例化对象 3 将视图的render方法注释 
	// ===== ；两件事： 1 传递路由id， 2 添加集合数据
	// 实例化集合
	var ic = new ImageCollection();
	// 实例化视图  别忘记定义容器元素
	var layer = new Layer({
		el: '#app',
		// 添加集合数据
		collection: ic
	});
	var list = new List({
		el: '#app',
		collection: ic
	});
	// 创建路由，分三步
	// 第一步 创建路由类
	var Router = Backbone.Router.extend({
		// 定义规则
		routes: {
			// 大图页是动态的
			'layer/:id': 'showLayer',
			// 列表页是默认的
			'*other': 'showList'
		},
		showLayer: function(id) {
			// 渲染
			layer.render(id);
			// 显示大图页，隐藏列表
			layer.$('.layer').show()
			layer.$('.list').hide();
		},
		showList: function() {
			// list.render();
			// 显示列表页，隐藏大图页
			list.$('.list').show();
			list.$('.layer').hide();
		}
	})
	// 第二步 实例化
	new Router();
	// 第三步启动
	// Backbone.history.start();
	// 我们如果想手动启动路由，我们可以定义在暴露的接口中
	return function() {
		Backbone.history.start();
	}
})