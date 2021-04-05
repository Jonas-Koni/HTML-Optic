var highlightNumber = -1;
var UmrechnungDegRad = 180/Math.PI;

var slider_angle = document.getElementById("angle");
var slider_Bi1 = document.getElementById("Bi1");
var slider_Bi2 = document.getElementById("Bi2");
var EinfallswinkelText = document.getElementById("EinfallswinkelText");

window.addEventListener('resize', refresh);

function refresh() {
  var canvas = document.getElementById("Reflection");
  var ctx = setupCanvas(canvas);
  drawCanvas();
}

drawCanvas();

function calcCanvasAngleBeta (angleAlpha, Brechzahl){
  var SinusAlpha = Math.sin(angleAlpha/UmrechnungDegRad);
  var Brechungswinkel = Math.asin(SinusAlpha/Brechzahl)*UmrechnungDegRad;
  return Brechungswinkel;
}

function drawCanvas(){
  var canvas = document.getElementById("Reflection");
  var ctx = setupCanvas(canvas);
  c_height = canvas.height;
  c_width = canvas.width;


  var Brechungsindex1 = parseFloat(document.getElementById("Bi1").value);
  var Brechungsindex2 = parseFloat(document.getElementById("Bi2").value);
  var Brechzahl = Brechungsindex2/Brechungsindex1;
  var angleAlpha = parseInt(document.getElementById("angle").value); //Einfallswinkel in Grad
  var angleBeta = calcCanvasAngleBeta(angleAlpha,Brechzahl);  //Brechungswinkel asin(sin(alpha)/Brechzahl)

  setupCanvas(canvas);
  drawCanvasMedium(ctx);
  drawCanvasGrenzflaeche(ctx);
  drawCanvasLot(ctx);
  writeCanvasTypeOfMedium(ctx);
  if(angleAlpha < 0 || angleAlpha> 90){return;}
  writeValues(angleBeta,Brechzahl,angleAlpha,Brechungsindex1,Brechungsindex2,ctx);
  drawCanvasIncidentRay(ctx,angleAlpha);
  drawCanvasReflectedRay(ctx,angleAlpha);
  drawCanvasRefractedRay(ctx,angleBeta);
  drawCanvasArcIncidentRay(ctx,angleAlpha);
  drawCanvasArcRefractedRay(ctx,angleBeta);
  setPositionAlphaBetaSymbols(ctx,angleAlpha,angleBeta);
  highlightNumber = -1;
}

function setupCanvas(canvas) {
  var dpr = window.devicePixelRatio || 1;
  var rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  var ctx = canvas.getContext('2d');

  return ctx;
}

function drawCanvasMedium(ctx){
  var h = c_height/2;

  ctx.fillStyle = 'rgba(251,239,2,1)';
  ctx.fillRect(0, 0, c_width, c_height); // Farben der 2 Medium

  ctx.fillStyle = 'rgba(200,200,200,0.8)';
  ctx.fillRect(0, h, c_width, c_height/2);
  ctx.fillStyle = 'rgba(170,170,170,0.8)';
  ctx.fillRect(0, Math.abs(h-c_height/2), c_width, c_height/2); // Farben der 2 Medium

  if(highlightNumber == 0){
    ctx.fillStyle = 'rgba(200,200,200,0.8)';
    ctx.fillRect(0, h, c_width, c_height/2);
  }
  if(highlightNumber == 1){
    ctx.fillStyle = 'rgba(170,170,170,0.8)';
    ctx.fillRect(0, Math.abs(h-c_height/2), c_width, c_height/2);
  }
}

function drawCanvasGrenzflaeche(ctx){
  ctx.beginPath();
  ctx.moveTo(0.1*c_width, c_height/2);
  ctx.lineTo(0.9*c_width, c_height/2);
  ctx.strokeStyle = 'rgba(10,10,200,0.5)';
  if(highlightNumber == 2) {ctx.strokeStyle = 'rgba(10,10,200,1)';}
  ctx.lineWidth = 3;
  ctx.stroke();
}

function drawCanvasLot(ctx){
  ctx.beginPath()
  ctx.moveTo(c_width/2,0.05*c_height);
  ctx.lineTo(c_width/2,0.95*c_height);
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  if(highlightNumber == 3) {ctx.strokeStyle = 'rgba(0,0,0,1)';}
  ctx.lineWidth = 3;
  ctx.stroke();
}


function writeCanvasTypeOfMedium(ctx){
  var heightUpperText = 0.86;
  var heightLowerText = 0.1;

  ctx.fillStyle = 'rgba(0,0,0,1)'
  ctx.textAlign = "center";
  ctx.font = (20*(c_height/500)|0) + 'px Arial';
  ctx.fillText("optisch", 0.92*c_width, c_height*(heightUpperText));
  ctx.fillText("dünneres", 0.92*c_width, c_height*(heightUpperText+0.04));
  ctx.fillText("Medium", 0.92*c_width, c_height*(heightUpperText+0.08));
  ctx.fillText("optisch", 0.92*c_width, c_height*(heightLowerText));
  ctx.fillText("dichteres", 0.92*c_width, c_height*(heightLowerText+0.04));
  ctx.fillText("Medium", 0.92*c_width, c_height*(heightLowerText+0.08));
}

function drawCanvasIncidentRay(ctx,angleAlpha){
  x = Math.cos((90+angleAlpha)*Math.PI/180)*c_height*0.4; //calc values of Lightlines
  y = -Math.sin((90+angleAlpha)*Math.PI/180)*c_height*0.4;

  ctx.beginPath();
  ctx.moveTo(x+c_width/2,y+c_height/2);
  ctx.lineTo(c_width/2,c_height/2);
  ctx.strokeStyle = 'rgba(200,10,10,0.5)';
  if(highlightNumber==4){ctx.strokeStyle = 'rgba(200,10,10,1)';}
  ctx.stroke();
}

function drawCanvasReflectedRay(ctx,angleAlpha) {
  x = Math.cos((90+angleAlpha)*Math.PI/180)*c_height*0.4; //calc values of Lightlines
  y = -Math.sin((90+angleAlpha)*Math.PI/180)*c_height*0.4;

  ctx.beginPath();
  ctx.moveTo(-x+c_width/2,y+c_height/2);
  ctx.lineTo(c_width/2,c_height/2)
  ctx.strokeStyle = 'rgba(30,140,20,0.5)';
  if(highlightNumber==5){ctx.strokeStyle = 'rgba(30,140,20,1)';}
  ctx.stroke();
}

function drawCanvasRefractedRay(ctx,angleBeta){
  x = Math.cos((270+angleBeta)/UmrechnungDegRad)*c_height*0.4;
  y = -Math.sin((270+angleBeta)/UmrechnungDegRad)*c_height*0.4;

  ctx.beginPath();
  ctx.moveTo(x+c_width/2,y+c_height/2);
  ctx.lineTo(c_width/2,c_height/2)
  ctx.strokeStyle = 'rgba(240,100,10,0.5)';
  if(highlightNumber==6){ctx.strokeStyle = 'rgba(240,100,10,1)';}
  ctx.stroke();
}

function drawCanvasArcIncidentRay(ctx,angleAlpha){
  var StartX = Math.cos((90+angleAlpha)/UmrechnungDegRad)*c_height*0.2+c_width/2;
  var StartY = -Math.sin((90+angleAlpha)/UmrechnungDegRad)*c_height*0.2+c_height/2;
  ctx.beginPath();
  ctx.moveTo(StartX, StartY);
  ctx.arc(c_width/2,c_height/2,c_height*0.2,-(90+angleAlpha)/UmrechnungDegRad,-90/UmrechnungDegRad,false);
  ctx.strokeStyle = 'rgba(200,10,10,0.5)';
  if(highlightNumber==7){ctx.strokeStyle = 'rgba(200,10,10,1)';}
  ctx.stroke();
}

function drawCanvasArcRefractedRay(ctx,angleBeta){
  ctx.beginPath();
  ctx.moveTo(c_width/2,c_height*0.8);
  ctx.arc(c_width/2,c_height/2,c_height*0.3,Math.PI/2,(90-angleBeta)*Math.PI/180,true);
  ctx.strokeStyle = 'rgba(240,100,0,0.5)';
  if(highlightNumber==8){ctx.strokeStyle = 'rgba(240,100,0,1)';}
  ctx.stroke();
}

function writeValues (angleBeta,Brechzahl,angleAlpha,Brechungsindex1,Brechungsindex2,ctx){
  document.getElementById("Brechungswinkel").innerHTML = Math.round(angleBeta*100)/100 + "°";
  document.getElementById("Brechungsindex").innerHTML = Math.round(Brechzahl*100)/100;
  document.getElementById("angle_value").innerHTML = angleAlpha + "°";
  document.getElementById("Bi1_value").innerHTML = Brechungsindex1;
  document.getElementById("Bi2_value").innerHTML = Brechungsindex2;
  document.getElementById("angle_reflection").innerHTML = angleAlpha + "°";
}

function setPositionAlphaBetaSymbols(ctx,angleAlpha,angleBeta){
  var posX_alpha = Math.cos((90+angleAlpha/2)*Math.PI/180)*c_height*0.1+c_width/2;
  var posY_alpha = -Math.sin((90+angleAlpha/2)*Math.PI/180)*c_height*0.1+c_height/2;

  var posX_beta = Math.cos((270+angleBeta/2)*Math.PI/180)*c_height*0.25+c_width/2;
  var posY_beta = Math.sin((90+angleAlpha/2)*Math.PI/180)*c_height*0.25+c_height/2;


  ctx.textAlign = "center";
  ctx.font = (28*(c_height/500)|0) + 'px Arial';
  ctx.fillStyle = 'rgba(200,10,10,0.5)';
  if(highlightNumber==7){ctx.fillStyle = 'rgba(200,10,10,1)';}
  ctx.fillText("\u03B1", posX_alpha, posY_alpha+8);
  ctx.fillStyle = 'rgba(240,100,0,0.5)';
  if(highlightNumber==8){ctx.fillStyle = 'rgba(240,100,0,1)';}
  ctx.fillText("\u03B2", posX_beta, posY_beta+8);

  ctx.beginPath();
  ctx.arc(posX_alpha,posY_alpha,10,0,2*Math.PI,true);
  ctx.stroke();
}


function highlight(number){ //0:Medium dicht, 1: Medium dünn; 2: Horizontlinie 3: Lot 4:Einfallsstrahl 5: Reflektionsstrahl 6: Brechungsstrahl 7: Einfallswinkel 8: Brechungswinkel
  highlightNumber = number;
  drawCanvas();
}
