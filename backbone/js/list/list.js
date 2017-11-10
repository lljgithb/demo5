// 定义列表页
define(['backbone', 'underscore', 'zepto.touch', 'css!./list.css'], function(Backbone, _, $) {
	// 将视图类暴露
	return Backbone.View.extend({
		// 绑定事件
		events: {
			// 为搜一搜按钮绑定tap事件
			'tap .search span': 'gotoSearch',
			// 为分类按钮绑定事件
			'tap .types li': 'showTypeResult',
			// 返回顶部
			'tap .go-top': 'gotoTop'
		},
		// 定义模板
		tpl: _.template('<a href="<%=href%>"><img style="<%=style%>" src="<%=src%>" alt=""></a>'),
		// 定义高度
		leftHeight: 0,
		rightHeight: 0,
		// 定义构造函数
		initialize: function() {
			// 初始化一些数据
			this.initDOM();
			// 构造函数中，监听集合的改变
			// this.collection.on('add',  function() {
			// 	// 作用域是集合实例化对象
			// })
			// 跨对象监听 语义化强
			this.listenTo(this.collection, 'add', function(model, collection, options) {
				// 作用域是视图
				this.render(model)
			})
			// 让集合获取数据
			this.getData();
			// 绑定window事件
			this.bindEvents();
		},
		// 绑定window事件
		bindEvents: function() {
			// 缓存实例化对象
			var me = this;
			// 基于时间节流解决高频操作的问题
			var fn = _.throttle(function() {
				me.getData();
			}, 500)
			// 绑定scroll事件，监听滚动
			$(window).on('scroll', function() {
				// 判断距离 bh < sh + wh + dh
				// bh $('body').height() 
				// sh $(window).scrollTop()
				// wh $(window).height()
				// dh 200
				if ($('body').height() < $(window).scrollTop() + $(window).height() + 200) {
					// me.getData();
					fn()
				}
				// 切换返回顶部按钮显隐
				me.toggleGoTop();
			})
		},
		// 返回顶部
		gotoTop: function() {
			window.scrollTo(0, 0)
		},
		// 切换返回顶部按钮显隐
		toggleGoTop: function() {
			// 滚动了300像素显示
			if ($(window).scrollTop() > 300) {
				this.$('.go-top').show()
			} else {
				// 隐藏
				this.$('.go-top').hide();
			}
		},
		// 让集合获取数据
		getData: function() {
			this.collection.fetchData();
		},
		// 初始化一些dom元素
		initDOM: function() {
			this.leftContainer = this.$('.left-container');
			this.rightContainer = this.$('.right-container');
		},
		render: function(model) {
			// 缓存模型高度
			var height = model.get('scaleHeight')
			// this.$el.html('<h1>list</h1>')
			// 查看模型数据
			// console.log(model.toJSON())
			// 1 获取数据
			var data = {
				href: '#layer/' + model.get('id'),
				src: model.get('url'),
				style: 'width: ' + model.get('scaleWidth') + 'px; height: ' + height + 'px;'
			}
			// 2 获取容器
			// 3 获取模板
			// 4 格式化模板
			var html = this.tpl(data);
			// 5 渲染
			// 判断左右容器高度，左 <= 右， 向左渲染
			if (this.leftHeight <= this.rightHeight) {
				// 向左渲染
				this.renderLeft(html, height)
			} else {
				this.renderRight(html, height)
			}
		},
		/***
		 * 向左渲染视图
		 * @html 	渲染字符串
		 * @height 	渲染的高度
		 ******/ 
		renderLeft: function(html, height) {
			// 左容器渲染
			this.leftContainer.append(html);
			// 更新高度 别忘记 边距
			this.leftHeight += height + 6;
		},
		/***
		 * 向右渲染视图
		 * @html 	渲染字符串
		 * @height 	渲染的高度
		 ******/ 
		renderRight: function(html, height) {
			// 右容器渲染视图
			this.rightContainer.append(html);
			// 更新高度
			this.rightHeight += height + 6;
		},
		// =============  我是分隔符，我很重要  ================
		// 获取搜索框内容
		getSearchInputValue: function() {
			// 获取搜索框
			return this.$('.search input').val();
		},
		// 检测内容的合法性
		checkSearchInputInvalid: function(val) {
			// 全是空白符，或者未输入不合法
			if (/^\s*$/.test(val)) {
				// 说明有问题
				return true
			}
			// 没有问题，返回false
			return false;
		},
		// 清除首尾空白符
		trim: function(val) {
			return val.replace(/^\s+|\s+$/g, '')
		},
		// 过滤集合
		collectionFilter: function(val) {
			return this.collection.filter(function(model) {
				// 条件 title包含val
				return model.get('title').indexOf(val) >= 0;
			})
		},
		// 清空视图
		clearView: function() {
			// 左右容器清空内容
			this.leftContainer.html('')
			this.rightContainer.html('')
			// 清空容器高度
			this.leftHeight = 0;
			this.rightHeight = 0;
		},
		/***
		 * 渲染视图方法
		 * @arr 	是一个数组，每一个成员是一个模型实例化对象
		 ***/ 
		renderAll: function(arr) {
			var me = this;
			// 遍历arr，渲染
			_.forEach(arr, function(model) {
				me.render(model)
			})
		},
		// 清空输入框内容
		clearSearchInputValue: function() {
			this.$('.search input').val('')
		},
		// 搜索
		gotoSearch: function() {
			// 2 获取输入框的内容
			var val = this.getSearchInputValue();
			// 3 校验合法性
			if (this.checkSearchInputInvalid(val)) {
				// 提示用户，阻止操作
				alert('您输入的内容有误！')
				return;
			}
			// 	合法可以继续操作
			// 	不合法阻止搜索操作
			// 清除左右两边空白符
			var val = this.trim(val); 
			// console.log(1, val,2,  this.trim(val),3)
			// 4 过滤集合
			var result = this.collectionFilter(val);
			// 5 清空内容（图片内容，容器高度）
			this.clearView();
			// 6 渲染视图
			this.renderAll(result);
			// 7 清空（可选）
			this.clearSearchInputValue();
		},
		// ============
		// 获取元素的data-type属性值
		getTypeId: function(e) {
			// 获取data-type
			// 源生方法
			// console.log(e.target.getAttribute('data-type'))
			// zepto两种方法
			// console.log(this.$(e.target).attr('data-type'))
			// console.log(this.$(e.target).data('type'))
			return this.$(e.target).data('type');
			// console.log(this.$())
		},
		/***
		 * 获取某类型的模型实例化对象
		 * @id 		分类id
		 * return 	分组的结果
		 *****/
		getTypeResult: function(id) {
			// 集合分组，获取该id类型的结果, 并返回
			return this.collection.groupBy('type')[id]
		},
		// 展示分类的结果
		showTypeResult: function(e) {
			// 1 为这些li绑定tap事件
			// 2 获取li对应的分类id
			var id = this.getTypeId(e);
			// 3 根据id获取模型数据（分组可以完美解决）
			var result = this.getTypeResult(id);
			// 4 清空视图
			this.clearView()
			// 5 渲染视图
			this.renderAll(result);
		}
	})
})