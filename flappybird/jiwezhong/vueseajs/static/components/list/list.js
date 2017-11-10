define(function(require, exports, module) {
	// 两个样式和一个过滤器
	require('./list.css')
	require('../home/items.css')
	require('filter/filter')
	module.exports = {
		// 注册变量
		props: ['query', 'search'],
		// 定义模板
		template: '#tpl_list',
		// 绑定数据
		data: function() {
			return {
				// 同步数据
				orders: [
					{id: 'price', text: '价格排序'},
					{id: 'sales', text: '销量排序'},
					{id: 'evaluate', text: '好评排序'},
					{id: 'discount', text: '优惠排序'}
				],
				// 绑定异步数据
				list: [],
				// 千万不要忘记绑定备份的数据
				other: []
			}
		},
		// 定义动态的数据
		computed: {
			// 过滤数据
			listFilter: function() {
				// 第二种方式
				// console.log(this.$parent.searchEnterValue)
				// 第一种方式
				// 用search过滤list，并将结果返回
				var result = [];
				// 遍历list，找到包含search的对象
				for (var i = 0; i < this.list.length; i++) {
					// 过滤标题，this.list[i]是对象，过滤的是this.list[i].title
					if (this.list[i].title.indexOf(this.search) >= 0) {
						// 存储成员
						result.push(this.list[i])
					}
				}
				// 将过滤的结果返回
				return result;

			}
		},
		// 定义方法
		methods: {
			// 展示剩余的产品
			showOthers: function() {
				// 将other添加给list
				this.list = this.list.concat(this.other)
				// other清空
				this.other = [];
			},
			// 数据排序
			listOrder: function(id) {
				// console.log(id)
				// 数组
				if (id === 'discount') {
					this.list.sort(function(a, b) {
						// 如果是优惠，要特殊处理，原价与现价的差值做比较
						// a的优惠 a.originPrice - a.price
						// b的优惠 b.originPrice - b.price
						// 升序
						// return (a.originPrice - a.price) - (b.originPrice - b.price)
						// 降序
						return (b.originPrice - b.price) - (a.originPrice - a.price)
					})
				} else {
					this.list.sort(function(a, b) {
						// 如果是优惠，要特殊处理，原价与现价的差值做比较
						// a，b是list的成员，是一个对象，比较的是里面的id属性值
						// 升序
						// return a[id] - b[id]
						// 降序
						return b[id] - a[id]
						
					})
				}
			}
		},
		// 请求异步数据
		created: function() {
			// 第一种方式
			// 请求query数据
			// var str = '';
			// if (this.query && this.query[0] && this.query[1]) {
			// 	str = '?' + this.query[0] + '=' + this.query[1]
			// }
			var str = '?' + this.$route.params.type + '=' + this.$route.params.id
			// 请求数据
			this.$http.get('data/list.json' + str)
				.then(function(res) {
					// 返回成功，存储
					if (res.data.errno === 0) {
						// 只显示三条数据，所以应该截取前三条，后面的数据可以备份
						this.list = res.data.data.slice(0, 3);
						// 备份
						this.other = res.data.data.slice(3);
					}
				})
		}
	}
})