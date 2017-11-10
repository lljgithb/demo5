function Bird(imgArr){
	this.imgArr = imgArr;
	this.iframe =  0;
	this.state = "DOWN";
	this.Y = 0;
	this.i = 0;
  // 定义鸟的盒模型
  this.pandingX = 20;
  this.pandingY = 18;
  this.A = {
    x:- this.pandingX,
    y:- this.pandingY
  };
  this.B ={
    x: this.pandingX,
    y:- this.pandingY
  }
  this.C = {
    x:- this.pandingX,
    y: this.pandingY
  };
  this.D = {
    x: this.pandingX,
    y: this.pandingY
  }
}
Bird.prototype.swing = function(){
	this.iframe ++;
	if(this.iframe>=3){
		this.iframe  = 0;
	}
}
Bird.prototype.energy = function(){ 
	this.state= "UP";
	this.i = 15;
  // console.log(Math.sqrt(this.i))
}
// 运行的时候
Bird.prototype.go = function(){
  if(this.state === "DOWN"){
  	this.i++;
  	this.Y-=Math.sqrt(this.i);	
  	// console.log("往下降落",this.i)
  }else{
  	this.i--;
  	// console.log("上升",this.i)
  	if(this.i===0){
  		this.state = "DOWN";
  		return;
  	}
  	this.Y+=Math.sqrt(this.i); 
  } 
  // console.log(this.Y)
}