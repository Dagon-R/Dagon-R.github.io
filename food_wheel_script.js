var wheel = new Image();
var arrow = new Image();
var ctx;
var power = 0;
var rotate = 0;
var generated = false;

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
	arrow.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Arrow_east.svg/640px-Arrow_east.svg.png';
	ctx = document.getElementById('canvas').getContext('2d');
	ctx.canvas.width  = window.innerWidth;
  	ctx.canvas.height = (window.innerHeight) * .8;
	var time = new Date();
	rotate = (2 * Math.PI) * (time.getMilliseconds() / 1000);
	window.requestAnimationFrame(initDraw);
}

function initDraw(){
	drawImageCenter(wheel, 50, 50, 550, 550, 1, rotate);
	drawImageCenter(arrow, 600, 600, 320, 230, 1, (1.25 * Math.PI));
}

function spin(){
	if(generated){
		var time = new Date();
		power = .2;
		rotate = (2 * Math.PI) * (time.getMilliseconds() / 1000);
		window.requestAnimationFrame(draw);
	}
	else{
		alert("No choices have been generated!");
	}
}

function drawImageCenter(image, x, y, cx, cy, scale, rotation){
    ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
    ctx.rotate(rotation);
    ctx.drawImage(image, -cx, -cy);
} 

function draw(){
	ctx.clearRect(0, 0, 2000, 2000);
	
	ctx.save();
	//ctx.translate(100, 100);
	rotate = (rotate + power) % (2 * Math.PI);
	//ctx.drawImage(sun, 1, 0, 200, 200, 0, 0, 200, 200);
	drawImageCenter(wheel, 50, 50, 550, 550, 1, rotate);
	ctx.restore();
	drawImageCenter(arrow, 600, 600, 320, 230, 1, (1.25 * Math.PI));
	if(power > 0){
		power -= .001;
		window.requestAnimationFrame(draw);
	}
	else{
		power = 0;	
	}
}

async function request(position){
	results = [];
		let response = await fetch("https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=30&currency=USD&distance=2&lunit=mi&lang=en_US&latitude=" + position.coords.latitude.toString() + "&longitude=" + position.coords.latitude.toString(), {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
			"x-rapidapi-key": "088d0d9be6mshaf2d0017945fa19p1fbbaejsn3332251d4e32"
			}
		}). then(
			successResponse => {
				if(successResponse.status != 200){
					return null;
				}
				else{
					output = successResponse.json();
				}
			},
			failResponse => {
				return null;
			}
		);
	
	
	generated = true;
}

function generate(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(request);
		
	}
	else{
		alert("Geolocation not supported by your browser!");
		return;
	}
	
}

init();
