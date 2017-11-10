/*
 *  @ctx Object 通过canvas得到的刷子
 *  @bj  Image   背景图片
 *  @dishu  Object 地鼠对象
 *  @chuizi Image 锤子图片
 *  @logo  Image  logo图片
 *  @ui  Image  UI图片
 */
function Game(ctx,bj,dishu,chuizi,logo,ui){
  this.ctx =ctx;
  this.bj = bj;
  this.dishu = dishu;
  this.chuizi = chuizi;
  this.logo = logo;
  this.ui = ui;
  // 洞属性 是一个数组，数组中的每一个对象表示这个洞的位置
  this.holes = [
    {
      x:89,
      y:51
    },
    {
      x:8,
      y:112
    },
    {
      x:89,
      y:112
    },
    {
      x:170,
      y:112
    },
    {
      x:89,
      y:177
    }
  ];
  // 洞的索引
  this.holeIdx = parseInt(Math.random()*this.holes.length);
  // 帧编号
  this.iframe = 0;
  // 锤子的x位置
  this.chuizix = 0;
  // 锤子的y位置
  this.chuiziy = 0;
  this.init();
}
Game.prototype.init = function(){
  this.renderBj();
  this.renderLogo();
  this.renderStart();
  this.bindEvent();
}
// 渲染背景
Game.prototype.renderBj = function(){
	this.ctx.drawImage(this.bj,0,0);
}
// 渲染logo
Game.prototype.renderLogo = function(){
	this.ctx.drawImage(this.logo,0,0)
}
// 渲染开始
Game.prototype.renderStart = function(){
  this.ctx.drawImage(this.ui,0,0,60,16,(this.ctx.canvas.width-60)/2,this.logo.height,60,16)
}
// 绑定事件
Game.prototype.bindEvent = function(){
	var me =  this;
	this.ctx.canvas.addEventListener("click",function(e){
		// 当点击的区域位于开始游戏这四个字之内 开始游戏
		var shouzhix = e.offsetX;
		var shouzhiy = e.offsetY;
		if(  shouzhix>=(me.ctx.canvas.width-60)/2 && shouzhix<=  (me.ctx.canvas.width-60)/2+ 60 && shouzhiy >=me.logo.height && shouzhiy<=me.logo.height+16 ){
			// 游戏开始
			me.start();
			me.renderDishu();
		}
    // 4个变量 用于确定一个矩形 该矩形就是地鼠的范围
    var dishujuxingX= me.holes[me.holeIdx].x;
    var dishujuxingY = me.holes[me.holeIdx].y;
    var dishujuxingW = 60;
    var dishujuxingH = 60;
    // 判断点击的位置
    if(shouzhix>dishujuxingX && shouzhix<=dishujuxingX+dishujuxingW && shouzhiy>=dishujuxingY && shouzhiy <= dishujuxingY+dishujuxingH){
      me.dishu.goDie();
      me.chuizix = shouzhix;
      me.chuiziy = shouzhiy;
    }
	},false)
}
Game.prototype.start = function(){
	var me = this;
  // 先停止
  this.stop();
  // 再开始
	this.timer = setInterval(function(){
    // 帧编号增加
		me.iframe++;
    // 增长
		me.dishu.growUp();
    // 调用检测方法 如果地鼠重置了 则洞的位置也重置
    if(me.dishu.check()){
      // 重置
      me.holeIdxReset(); 
    }
    // 渲染背景
    me.renderBj(); 
    // 渲染地鼠
    me.renderDishu();
    // 判断地鼠存活状态 如果已经死了 则有10帧的间隔来渲染锤子
    if(!me.dishu.alive){ 
        me.renderChuizi(me.chuizix,me.chuiziy,me.dishu.lifeNum>=45?true:false);
    }
	},30)
}
Game.prototype.renderDishu = function(){ 
	this.ctx.drawImage(this.dishu.img,this.dishu.num*this.dishu.width,0,this.dishu.width,58,this.holes[this.holeIdx].x,this.holes[this.holeIdx].y,60,58)
}
// 重置洞的位置
Game.prototype.holeIdxReset = function(){
   this.holeIdx = parseInt(Math.random()*this.holes.length);
}
// 停止游戏
Game.prototype.stop = function(){
  clearInterval(this.timer)
}
// 渲染锤子
/*
 * @x 锤子的中心点
 * @y 锤子的中心点
 * @bool 渲染锤子还是星星
 *
 */
Game.prototype.renderChuizi = function(x,y,bool){
  var img_x = 0;
  if(bool){
    img_x = this.chuizi.width/2
  }
  this.ctx.drawImage(this.chuizi,img_x,0,87,60,x-87/2,y-30,87,60)
}