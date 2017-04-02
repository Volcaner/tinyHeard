var can1;
var can2;

//定义对应的场景
var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;//上一帧被执行时间
var deltaTime;//两帧时间间隔

var bgPic = new Image();

var ane;
var fruit;

var mom;
var baby;

var mx;
var my;

var data;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var bigTail = [];
var bigEye = [];
var momBodyOrange = [];
var momBodyBlue = [];

var wave;
var halo;

var dust;
var dustPic = [];

document.body.onload = game;
function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

function init(){
	//获得canvas context
	can1 = document.getElementById("canvas1");//fishes,dust,UI，circle
	ctx1 = can1.getContext('2d');//创建穿ctx1对象
	can2 = document.getElementById("canvas2");//backgroud,ane,fruit
	ctx2 = can2.getContext('2d');

	can1.addEventListener('mousemove', onMouseMove, false);

	bgPic.src = "./src/background.jpg";

	canWidth = can1.width;
	canHeight = can1.height;

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	baby = new babyObj();
	baby.init();

	mx = canWidth * 0.5;
	my = canHeight * 0.5;

	for(var i = 0; i < 8; i++){
		bigTail[i] = new Image();
		bigTail[i].src = "./src/bigTail" + i + ".png";
	}
	for(var i = 0; i < 2; i++){
		bigEye[i] = new Image();
		bigEye[i].src = "./src/bigEye" + i + ".png";
	}

	for(var i = 0; i < 8; i++){
		babyTail[i] = new Image();
		babyTail[i].src = "./src/babyTail" + i +".png";
	}
	for(var i = 0; i < 2; i++){
		babyEye[i] = new Image();
		babyEye[i].src = "./src/babyEye" + i + ".png";
	}
	for(var i = 0; i < 20; i++){
		babyBody[i] = new Image();
		babyBody[i].src = "./src/babyFade" + i + ".png";
	}
	for(var i = 0; i < 8; i++){
		momBodyOrange[i] = new Image();
		momBodyOrange[i].src = "./src/bigSwim" + i + ".png";
		momBodyBlue[i] = new Image();
		momBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
	}

	data = new dataObj();

	ctx1.fillStyle = "white";
	ctx1.font = "20px Verdana";
	ctx1.textAlign = "center";//center left right

	wave = new waveObj();
	wave.init();
	
	halo = new haloObj();
	halo.init();

	for(var i =0; i < 7; i++){
		dustPic[i] = new Image();
		dustPic[i].src = "./src/dust" + i + ".png";
	}

	dust =new dustObj();
	dust.init();

}
function gameloop(){
	window.requestAnimFrame(gameloop);//智能计算；而setInterval,setTimeout定死了时间
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	if(deltaTime > 40) deltaTime = 40;

	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();

	ctx1.clearRect(0, 0, canWidth, canHeight);
	mom.draw();
	momFruitsCollision();
	momBabyCollision();
	baby.draw();

	data.draw();

	wave.draw();

	halo.draw();

	dust.draw();
}
function onMouseMove(e){
	if(!data.gameOver){
		if(e.offSetX || e.layerX){
			mx = e.offSetX == undefined ? e.layerX : e.offSetX;
			my = e.offSetY == undefined ? e.layerY : e.offSetY;
		}
	}
	
}