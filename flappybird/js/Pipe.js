/* 管子类
 * 
 * 
 */
function Pipe(img_up,img_down,speed,medals_imgArr){
   this.img_up = img_up;
   this.img_down = img_down;
   this.speed = speed;
   this.iframe = 0;
   this.hasMedals = true;
   this.up_length = Math.random() * 250;
   this.down_length = 250 - this.up_length;
   this.width = this.img_up.width;
   this.medals_imgArr= medals_imgArr;
   this.score = parseInt(Math.random()* medals_imgArr.length)
}
Pipe.prototype.move = function(){
	this.iframe ++;
}
Pipe.prototype.loseMedals = function(){
	this.hasMedals  =  false;
}