var wheel = new Image();
var ctx;

function init() {
	wheel.src = 'https://i.stack.imgur.com/I7oFb.png';
	ctx = document.getElementById('canvas').getContext('2d');
	window.requestAnimationFrame(draw);
}

function drawImageCenter(image, x, y, cx, cy, scale, rotation){
    ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
    ctx.rotate(rotation);
    ctx.drawImage(image, -cx, -cy);
} 

function draw(){
	var rotate = 0;
	ctx.clearRect(0, 0, 2000, 2000);
	ctx.fillRect(0, 0, 2000, 2000);// clear canvas
	
	ctx.save();
	//ctx.translate(100, 100);
	var time = new Date();
	rotate = (((2 * Math.PI)) * time.getSeconds() + ((2 * Math.PI) / 1000) * time.getMilliseconds());
	//ctx.drawImage(sun, 1, 0, 200, 200, 0, 0, 200, 200);
	drawImageCenter(wheel, 200, 200, 550, 550, 1, rotate);
	ctx.restore();

  window.requestAnimationFrame(draw);
}

init();