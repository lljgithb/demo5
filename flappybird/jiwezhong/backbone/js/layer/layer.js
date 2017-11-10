// 定义视图模块
define(['backbone','underscore', 'zepto', 'zepto.touch', 'css!./layer.css'], function(Backbone, _, $) {
	var height = $(window).height();
	// var LayerView = Backbone.View.extend({})
	// return LayerView;
	// 定义的视图类要暴露出来
	return Backbone.View.extend({
		// 定义模板
		tpl: _.template($('#tpl_layer').text()),
		// 定义默认id
		modelID: 0,
		// 绑定事件做交互
		events: {
			// 点击图片，切换header的显隐
			'tap .layer-container img': 'toggleHeader',
			// 向左划，显示下一张图片
			'swipeLeft .layer-container img': 'showNextImage',
			// 向右划，显示前一张图片
			'swipeRight .layer-container img': 'showPrevImage',
			// 点击返回按钮，返回上一个操作页
			'tap .layer .go-back': 'goBackPage'
		},
		// 返回上一个页面
		goBackPage: function() {
			// 源生方法，返回上一个历史记录
			// history.go(-1)
			// 返回列表页
			location.hash = '#'
		},
		// 显示下一张图片
		showNextImage: function() {
			// 下一张图片，id加一
			this.modelID++;
			// 获取模型
			var model = this.collection.get(this.modelID)
			// 渲染该图片
			if (model) {
				// Backbone.history.location.replace('#/layer/' + this.modelID)
				location.hash = '#/layer/' + this.modelID
			// 如果不存在，说明最后一张了
			} else {
				// 多加的要减回来
				this.modelID--;
				// 不能用alert，会阻断setTimeout，导致zepto。touch事件报错
				console.log('已经是最后一张了')
				return ;
			}
		},
		// 显示前一张图片
		showPrevImage: function() {
			// 上一张图片，id减一
			this.modelID--;
			// 获取模型
			var model = this.collection.get(this.modelID);
			// 图片模型存在，我们渲染
			if (model) {
				// Backbone.history.location.replace('#/layer/' + this.modelID)
				// 希望历史记录记录下来
				location.hash = '#/layer/' + this.modelID;
			// 如果不存在，说明最后一张了
			} else {
				// 多减的加回来
				this.modelID++;
				console.log('已经是第一张了')
				return ;
			}
		},
		// 切换图片title显隐
		toggleHeader: function() {
			this.$('.layer .header').toggle();
		},
		render: function(id) {
			// this.$el.html('<h1>layer</h1>')
			// 1 获取数据
			var model = this.collection.get(id);
			// console.log(model)
			// 如果没有找到大图页，我们要进入列表页
			if (!model) {
				// 改变hash
				// location.hash = '#/';
				// Backbone提供过来一个方法，
				Backbone.history.location.replace('#')
				// 不能再执行了
				return;
			}
			// 缓存id
			this.modelID = id;
			// 2 获取容器
			var dom = this.$('.layer')
			// 3 获取模板
			// 4 格式化模板
			var html = this.tpl({
				src: model.get('url'),
				title: model.get('title'),
				style: 'line-height: ' + height + 'px'
			})
			// 5 渲染视图
			dom.html(html)
		}
	})
})