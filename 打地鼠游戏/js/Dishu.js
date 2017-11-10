function Dishu(img_arr){
  this.img_arr = img_arr;
  this.index =parseInt( Math.random() * this.img_arr.length);
  this.img = this.img_arr[this.index];
  this.width = this.index === 2?74:60;
  // 地鼠的存活状态
  this.alive = true;
  // 地鼠的当前生命周期
  this.lifeNum = 0;
  // 地鼠的总生命周期
  this.wholeLife = 50;
  // 地鼠的状态
  this.num = 0;
}
// 生长方法
Dishu.prototype.growUp = function(){
	this.lifeNum++;
	if(this.alive){
		if(this.lifeNum<10){
			this.num = 0;
		}else if(this.lifeNum<20){
			this.num = 1;
		}else if(this.lifeNum<50){
			this.num = this.lifeNum%2 ? 3 : 2;
		}
	}else{
		this.num = 4; 
	}
	
}
// 死掉方法
Dishu.prototype.goDie = function(){  
	   this.alive = false; 
	   this.lifeNum = 40;
}
// 重置方法
Dishu.prototype.reset = function(){
	this.index =parseInt( Math.random() * this.img_arr.length);
  this.img = this.img_arr[this.index];
  this.width = this.index === 2?74:60;
  this.alive = true;
  this.lifeNum = 0;
  this.num = 0;
}
// 检测方法
Dishu.prototype.check = function(){
	if(this.lifeNum >= this.wholeLife){
		  this.reset();
		  return true;
	}

}