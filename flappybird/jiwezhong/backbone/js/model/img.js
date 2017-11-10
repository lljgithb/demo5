// 定义图片模型类
define(['backbone', 'zepto'], function(Backbone, $) {
	// 获取容器的宽度
	// (总宽度 - 3个边距) / 2
	var scaleWidth = ($(window).width() - 3 * 6) / 2;
	// 创建图片模型
	var ImageModel = Backbone.Model.extend({
		// 构造函数中适配模型数据
		initialize: function(obj) {
			// 在构造函数内，我们通常使用attributes操作属性
			// sh = sw * oh / ow
			var scaleHeight = scaleWidth * obj.height / obj.width;
			// 将数据存储在模型实例化对象中
			this.attributes.scaleWidth = scaleWidth;
			this.attributes.scaleHeight = scaleHeight;
		}
	})
	// 千万不要忘记暴露接口
	return ImageModel;
})