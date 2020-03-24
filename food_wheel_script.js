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
	ctx = document.getElementById('canvas').getContext('2d');
	ctx.canvas.width  = window.innerWidth;
  	ctx.canvas.height = (window.innerHeight) * .8;
	//window.requestAnimationFrame(initDraw);
	setSrc(window.requestAnimationFrame(initDraw));
}

function initDraw(){
	var time = new Date();
	rotate = (2 * Math.PI) * (time.getMilliseconds() / 1000);
	var rotate = (2 * Math.PI) * (time.getMilliseconds() / 1000);
	ctx.clearRect(0, 0, 2000, 2000);
	drawImageCenter(wheel, 50, 50, 550, 550, 1, rotate);
	drawImageCenter(arrow, 600, 600, 320, 230, 1, (1.25 * Math.PI));
}

function setSrc(callback) {
	wheel.onload = callback;
	wheel.src = 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Eight-colour-wheel-2D.png';
	arrow.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Arrow_east.svg/640px-Arrow_east.svg.png';
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
		var length = output.data.length;
		do{
			var time = new Date();
			var random = output.data[(time.getMilliseconds() % length)];
		}
		while(typeof random.name === 'undefined');
		//alert(random.name);
		var modal = $('#foodModal');
		modal.find('.modal-title').text(random.name);
		if(random.website !== undefined){
			modal.find('.modal-body').text(random.website);
		}
		else(random.address !== undefined){
			modal.find('.modal-body').text(random.address);
		}
		else{
			modal.find('.modal-body').text(random.web_url);
		}
		modal.modal(options);
	}
}

//For future reference:
//vegetarian friendly: 10665
//vegan friendly: 10697
//gluten free options: 10992
//Halal: 10751

async function request(position){
	results = [];
	var rating = 3.0;
	var vegetarianBool = "";
	var veganBool = "";
	var glutenBool = "";
	var dietary = "";
	var minimumRating = 3.0;
	if($('#inlineCheckbox1').is(":checked")){
		vegetarianBool = "10665%252C";
		var dietary = "&dietary_restrictions=";
	}
	if($('#inlineCheckbox2').is(":checked")){
		veganBool = "10697%252C";
		var dietary = "&dietary_restrictions=";
	}
	if($('#inlineCheckbox3').is(":checked")){
		glutenBool = "10992%252C";
		var dietary = "&dietary_restrictions=";
	}
	if($('#rating').children("option:selected").val() !== undefined){
		minimumRating = $('#rating').children("option:selected").val();
	}
	var url = 'https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=11&currency=USD&distance=10' + dietary + vegetarianBool + veganBool + glutenBool + '&open_now=true&lunit=mi&lang=en_US&min_rating=' + minimumRating + '&latitude=' + position.coords.latitude.toFixed(4).toString() + '&longitude=' + position.coords.longitude.toFixed(4).toString();
		let response = await fetch(url, {
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
					return successResponse.json();
				}
			},
			failResponse => {
				return null;
			}
		);
	if(response.data.length == 0){
		generated = false;
		alert("That's a bit too specific! Try lowering the required rating.");
		return null;
	}
	output = response;
	
	
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
