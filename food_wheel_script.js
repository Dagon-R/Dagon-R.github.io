var wheel = new Image();
var ctx;
var power = 0;

const orange = 0;
const yellow = 45;
const lgreen = 90;
const dgreen = 135;
const blue = 180;
const purple = 225;
const violet = 270;
const red = 315;

function init() {
	wheel.src = 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Eight-colour-wheel-2D.png';
	ctx = document.getElementById('canvas').getContext('2d');
	window.requestAnimationFrame(draw);
}

function spin(){
	power = 100;
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
	rotate = ((((2 * Math.PI)) * time.getSeconds() * power) + (((2 * Math.PI) / 1000) * time.getMilliseconds()) * power);
	//ctx.drawImage(sun, 1, 0, 200, 200, 0, 0, 200, 200);
	drawImageCenter(wheel, 750, 750, 550, 550, 1, rotate);
	ctx.restore();
	if(power > 1){
		power--;
		window.requestAnimationFrame(draw);
	}
}

init();