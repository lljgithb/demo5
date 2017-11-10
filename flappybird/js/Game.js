/*
 *  定义Game类 该类的实例决定整个游戏
 *  @ctx canvas的刷子
 *  @bg_day 白天的背景
 *  @land   地面
 *  @pipeArr   管子数组
 *  @bird   小鸟
 */
function  Game(ctx,bg_day,land,pipeArr,Pipe,bird){
   this.ctx = ctx;
   this.bg_day = bg_day;
   this.land = land;
   this.pipeArr = pipeArr;
   this.bird = bird;
   this.Pipe = Pipe;
   this.iframe = 0;
   this.score = 0;
   this.start();
   this.bindEvent();
}
// 绘制背景
Game.prototype.renderBG = function(){
	var moved = -this.iframe * this.bg_day.speed % this.bg_day.img.width;
	this.ctx.drawImage(this.bg_day.img,0+moved,0)
	this.ctx.drawImage(this.bg_day.img,this.bg_day.img.width+moved,0);
	this.ctx.drawImage(this.bg_day.img,this.bg_day.img.width*2 + moved,0);
}
Game.prototype.renderLand = function(){
	var moved = -this.iframe * this.land.speed % this.land.img.width;
	this.ctx.drawImage(this.land.img,0+moved,400)
	this.ctx.drawImage(this.land.img,this.land.img.width+moved,400);
	this.ctx.drawImage(this.land.img,this.land.img.width*2 + moved,400);
}
Game.prototype.renderPipe = function(){
	for(var i =0;i<this.pipeArr.length;i++){
		// 定义好需要的九个参数
		var pipe = this.pipeArr[i];
		if((pipe.iframe * pipe.speed % 200  <= pipe.speed)  && (pipe.iframe * pipe.speed>200) && (pipe.iframe * pipe.speed)<300){
			this.createPipe();
		}
		if(pipe.iframe * pipe.speed >= 440){
			this.pipeArr.shift()
			i--;
			continue;
		}
		pipe.move();
		var up_img = pipe.img_up;
		var up_img_x = 0;
		var up_img_y = pipe.img_up.height - pipe.up_length; 
		var up_img_width = up_img.width;
		var up_img_height = pipe.up_length;
		var up_canvas_x = 360 - pipe.iframe * pipe.speed;
		var up_canvas_y = 0;
		var up_canvas_width = up_img_width;
		var up_canvas_height = up_img_height;
		this.ctx.drawImage(up_img,up_img_x,up_img_y,up_img_width,up_img_height,up_canvas_x,up_canvas_y,up_canvas_width,up_canvas_height);
		// 绘制下边管子的参数
		var down_img = pipe.img_down;
		var down_img_x = 0;
		var down_img_y = 0;
		var down_img_width = up_img_width;
		var down_img_height = pipe.down_length;
		var down_canvas_x = up_canvas_x;
		var down_canvas_y = up_img_height+150;
		var down_canvas_width = down_img_width;
		var down_canvas_height = down_img_height;
		this.ctx.drawImage(down_img,down_img_x,down_img_y,down_img_width,down_img_height,down_canvas_x,down_canvas_y,down_canvas_width,down_canvas_height);
		// 渲染金币
		if(pipe.hasMedals){
			var jinbi = pipe.medals_imgArr[pipe.score];
			var jinbi_x = up_canvas_x+(up_img_width-jinbi.width)/2;
			var jinbi_y = up_canvas_height+ (150-jinbi.height)/2;
			this.ctx.drawImage(jinbi,jinbi_x,jinbi_y)
		}
	} 
}
Game.prototype.start = function(){
	var me = this;
	this.stop();
	this.timer = setInterval(function(){
		me.clear();
		me.iframe ++;
		if(me.iframe % 4 === 0){
			me.bird.swing();
		}
		me.bird.go();
		me.renderBG();
		me.renderLand();
		me.pengzhuangjiance();
		me.renderPipe();
		me.renderBird();
	},20)
}
Game.prototype.clear = function(){
	this.ctx.clearRect(-1000,-1000,2000,2000)
}
Game.prototype.stop =function(){
	clearInterval(this.timer);
}
Game.prototype.createPipe = function(){
	this.pipeArr.push(new this.Pipe(this.pipeArr[0].img_up,this.pipeArr[0].img_down,this.land.speed,this.pipeArr[0].medals_imgArr))
}
Game.prototype.renderBird = function(){
	this.ctx.save();
	this.ctx.translate(100,100-this.bird.Y);
	/************************************************
	this.ctx.beginPath();
	this.ctx.arc(this.bird.A.x,this.bird.A.y,1,0,Math.PI*2);
	this.ctx.closePath();
	this.ctx.fill();
	this.ctx.beginPath();
	this.ctx.arc(this.bird.B.x,this.bird.B.y,1,0,Math.PI*2);
	this.ctx.closePath();
	this.ctx.fill();
	this.ctx.beginPath();
	this.ctx.arc(this.bird.C.x,this.bird.C.y,1,0,Math.PI*2);
	this.ctx.closePath();
	this.ctx.fill();
	this.ctx.beginPath();
	this.ctx.arc(this.bird.D.x,this.bird.D.y,1,0,Math.PI*2);
	this.ctx.closePath();
	this.ctx.fill();
	****************************/ 
	if(this.bird.state ==="UP"){
	  this.ctx.rotate(-this.bird.i* 3 * Math.PI /180);
	}else{
		this.ctx.rotate(this.bird.i * Math.PI /180);
	}
	this.ctx.drawImage(this.bird.imgArr[this.bird.iframe],-24,-24)
	this.ctx.restore();
}
Game.prototype.bindEvent = function(){
	var me = this;
	this.ctx.canvas.addEventListener("click",function(){
		me.bird.energy();
	},false)
}
Game.prototype.pengzhuangjiance = function(){
	// 循环数组中的所有管子 挨个与鸟进行碰撞检测
	for(var i =0;i<this.pipeArr.length;i++){
		var pipe = this.pipeArr[i]
		// 上面管子的c点x值
		var up_pipe_C_x = 360- pipe.speed * pipe.iframe;
		var up_pipe_C_y = pipe.up_length;
		var up_pipe_D_x = up_pipe_C_x+pipe.width;
		var bird_B_x = 100 + this.bird.B.x;
		var bird_B_y = 100-this.bird.Y + this.bird.B.y;
		var bird_A_x = bird_B_x - this.bird.pandingX*2;
		var up_pipe_B_x = up_pipe_D_x;
		// console.log(up_pipe_C_x,up_pipe_C_y,bird_B_x,bird_B_y)
		// 检测管子c点的x值与鸟的b点的x值 管子c点y值与鸟的b点y值
		if(up_pipe_C_x<bird_B_x && up_pipe_C_y > bird_B_y &&  bird_A_x <up_pipe_D_x ){
			this.stop();
		}
		// 检测下方管子a点的x值与y值  与鸟的d点
		var down_pipe_A_x = up_pipe_C_x;
		var down_pipe_A_y = up_pipe_C_y+150;
		var bird_D_x = bird_B_x ;
		var bird_D_y = bird_B_y + this.bird.pandingY*2;
		if(down_pipe_A_x< bird_D_x && down_pipe_A_y < bird_D_y &&  bird_A_x <up_pipe_D_x ){
			this.stop();
		} 
		// 检测鸟D点的y值或者鸟C点的Y值
		if(bird_D_y>=400){
			this.stop();
		}
		// 检测鸟是否吃到金币
		var jinbi_x = up_pipe_C_x+(pipe.width-pipe.medals_imgArr[pipe.score].width)/2;
		if(bird_B_x >= jinbi_x && pipe.hasMedals){
			pipe.loseMedals();
			this.add(pipe.score+1);
		}
	}
}
Game.prototype.add = function(score){
	this.score += score;
	console.log(this.score)
}