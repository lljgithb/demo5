// 引入zepto，为了发送异步请求
define(['backbone', 'model/img', 'zepto', 'underscore'], function(Backbone, ImageModel, $, _) {
	// 定义集合
	var ImageCollction = Backbone.Collection.extend({
		// 绑定模型
		model: ImageModel,
		// 定义请求数据地址
		url: 'data/imageList.json',
		// 定义id计数器
		modelID: 0,
		// 由于返回的数据格式跟我们期望的不一致，所以我们要定义请求数据的方法
		fetchData: function() {
			// 缓存this
			var me = this;
			$.get(this.url, function(res) {
				// console.log(res)
				// 数据返回成功，我们要存储在集合中
				if (res && res.errno === 0) {
					// 将返回的数据，打乱顺序，乱序
					// 对res.data乱序
					res.data.sort(function() {
						// 随机一个正数或者负数，就是随机排序
						return Math.random() > 0.5 ? 1 : -1;
					})
					// 为每一个成员添加id，目的是：打开大图页，要根据id找模型，所以模型要具有id，不能与视图公用，因此不能用cid
					// 为模型添加id，就是为res.data中每一个对象添加id属性
					// 遍历res.data数组
					// res.data.forEach
					_.forEach(res.data, function(obj, index, arr) {
						// 为obj添加id
						obj.id = me.modelID++;
					})
					// 存储数组
					me.add(res.data)
					// 遍历集合
					// me.forEach(function(model) {
					// 	console.log(model.toJSON())
					// })
					// console.log(me)
				}
			})
		}
	})
	// 暴露接口
	return ImageCollction; 
})