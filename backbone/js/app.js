// 该文件就是根目录了
// 配置
require.config({
	// 定义path
	paths: {
		// 简化路径
		'zepto': 'lib/zepto',
		'underscore': 'lib/underscore',
		'backbone': 'lib/backbone',
		'zepto.touch': 'lib/zepto.touch'
	},
	// 模块化
	shim: {
		
		// 第二种方案
		'zepto': {
			// 暴露接口
			exports: 'Zepto'
		},
		'zepto.touch': {
			// 依赖zepto
			deps: ['zepto'],
			exports: 'Zepto'
		}
	},
	// 配置css插件
	map: {
		// 所有文件
		'*': {
			// 对于css前缀，用lib/css插件
			'css': 'lib/css'
		}
	}
})
require(['route/route', 'css!reset.css'], function(route) {
	// 启动路由就是执行接口
	route();
	// 轮播图部分
	 var mySwiper = new Swiper(".swiper-container",{  
        direction:"horizontal",/*横向滑动*/  
        // effect:"coverflow",
        loop:true,/*形成环路（即：可以从最后一张图跳转到第一张图*/  
        pagination:".swiper-pagination",/*分页器*/  
        // prevButton:".swiper-button-prev",/*前进按钮*/  
        // nextButton:".swiper-button-next",/*后退按钮*/  
        autoplay : 2000,
        autoplayDisableOnInteraction : false  
    })
})