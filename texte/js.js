var information_marginLeft_to_navigation = 20;
var c_height;
var c_width;
var highlightNumber = -1;

var navigation = document.getElementById("navigation");
var information = document.getElementById("information");
var footer = document.getElementById("footer");
var footer_style = window.getComputedStyle(footer);
var information_style = window.getComputedStyle(information);
var header = document.getElementById("header");
var slider_angle = document.getElementById("angle");
var slider_Bi1 = document.getElementById("Bi1");
var slider_Bi2 = document.getElementById("Bi2");
var EinfallswinkelText = document.getElementById("EinfallswinkelText");



var navigation_height = navigation.offsetHeight;
var footer_height = footer.offsetHeight;
var footer_marginTop = parseFloat(footer_style.marginTop);
var header_width = header.offsetWidth;
var information_marginLeft = parseFloat(information_style.marginLeft);
var information_paddingLeft = parseFloat(information_style.paddingLeft);
var information_paddingRight = parseFloat(information_style.paddingRight);
var footer_paddingLeft = parseFloat(footer_style.paddingLeft);
var footer_paddingRight = parseFloat(footer_style.paddingRight);
var information_marginTop = parseFloat(information_style.paddingTop);
var information_marginBottom = parseFloat(information_style.paddingBottom);
var navigation_width = navigation.offsetWidth;

information.style.width = header_width - information_marginLeft_to_navigation - navigation_width - information_paddingLeft - information_paddingRight;
footer.style.width = header_width - information_marginLeft_to_navigation - navigation_width - footer_paddingLeft - footer_paddingRight;

information.style.minHeight = navigation_height - footer_height - footer_marginTop - information_marginTop - information_marginBottom - 2;
information.style.marginLeft = navigation_width + information_marginLeft_to_navigation;
footer.style.marginLeft = navigation_width + information_marginLeft_to_navigation;



var author_name = document.getElementsByTagName("meta")[0];
document.getElementById("author").innerHTML = "Autor: " + author_name.content;

window.addEventListener('resize', refresh);

function highlight(number){ //0:Medium dicht, 1: Medium dünn; 2: Horizontlinie 3: Lot 4:Einfallsstrahl 5: Reflektionsstrahl 6: Brechungsstrahl 7: Einfallswinkel 8: Brechungswinkel
  highlightNumber = number;
  drawCanvas();
}

drawCanvas();



function refresh() {
  navigation_height = navigation.offsetHeight;
  information.style.minHeight = navigation_height - footer_height - footer_marginTop - information_marginTop - information_marginBottom - 2;
  console.log("hi");
  var canvas = document.getElementById("Reflection");
  var c = setupCanvas(canvas);
  drawCanvas();
}

function drawCanvas(){
  var canvas = document.getElementById("Reflection");
  var c = setupCanvas(canvas);
  c_height = canvas.height;
  c_width = canvas.width;

  setupCanvas(canvas);

  var Bi1_actual_value = parseInt(document.getElementById("Bi1").value); //Brechungsindex
  var Bi2_actual_value = parseInt(document.getElementById("Bi2").value);
  var a = parseInt(document.getElementById("angle").value); //Einfallswinkel in Grad


  Bi1 = calcBi(Bi1_actual_value);
  Bi2 = calcBi(Bi2_actual_value);

  var n = Bi1/Bi2; //n = Brechzahl
  drawCanvasSetup(c,n);
  if(n<1){
    n = Math.pow(n,-1);
  }

  var b = Math.asin(Math.sin(a*Math.PI/180)/n)*180/Math.PI; //Brechungswinkel asin(sin(alpha)/n)

  writeValues(b,n,a,Bi1,Bi2,c);
  drawCanvasLightLines(c,a,b,c_height,c_width);

  highlightNumber = -1;
}





function drawCanvasLightLines(c,a,b,c_height,c_width){
  x = Math.cos((90+a)*Math.PI/180)*c_height*0.4; //calc values of Lightlines
  y = -Math.sin((90+a)*Math.PI/180)*c_height*0.4;
  x2 = Math.cos((270+b)*Math.PI/180)*c_height*0.4;
  y2 = -Math.sin((270+b)*Math.PI/180)*c_height*0.4;

  c.beginPath();
  c.moveTo(x+c_width/2,y+c_height/2);
  c.lineTo(c_width/2,c_height/2);
  c.strokeStyle = 'rgba(200,10,10,0.5)';
  if(highlightNumber==4){c.strokeStyle = 'rgba(200,10,10,1)';}
  c.stroke();

  c.beginPath();
  c.moveTo(-x+c_width/2,y+c_height/2);
  c.lineTo(c_width/2,c_height/2)
  c.strokeStyle = 'rgba(30,140,20,0.5)';
  if(highlightNumber==5){c.strokeStyle = 'rgba(30,140,20,1)';}
  c.stroke();

  c.beginPath();
  c.moveTo(x2+c_width/2,y2+c_height/2);
  c.lineTo(c_width/2,c_height/2)
  c.strokeStyle = 'rgba(240,100,10,0.5)';
  if(highlightNumber==6){c.strokeStyle = 'rgba(240,100,10,1)';}
  c.stroke();

  c.beginPath();
  c.moveTo(Math.cos((90+a)*Math.PI/180)*c_height*0.2+c_width/2,-Math.sin((90+a)*Math.PI/180)*c_height*0.2+c_height/2);
  c.arc(c_width/2,c_height/2,c_height*0.2,(270-a)*Math.PI/180,(270)*Math.PI/180,false);
  c.strokeStyle = 'rgba(200,10,10,0.5)';
  if(highlightNumber==7){c.strokeStyle = 'rgba(200,10,10,1)';}
  c.stroke();

  c.beginPath();
  c.moveTo(c_width/2,c_height*0.8);
  c.arc(c_width/2,c_height/2,c_height*0.3,Math.PI/2,(90-b)*Math.PI/180,true);
  c.strokeStyle = 'rgba(240,100,0,0.5)';
  if(highlightNumber==8){c.strokeStyle = 'rgba(240,100,0,1)';}
  c.stroke();
}





function drawCanvasSetup(c,n){
  var d; //y startwert "dünneres"
  var f;//y Startwert "dickeres"
  var t;//farbe oben
  var b; //farbe unten


  if(n<1){
    d = 0.1;
    f = 0.86;
    h = 0;
    console.log("<1");

  } else {
    d = 0.86;
    f = 0.1;
    h = c_height/2;
    console.log(">1");
  }


  c.fillStyle = 'rgba(251,239,2,1)';
  c.fillRect(0, 0, c_width, c_height); // Farben der 2 Medium

  c.fillStyle = 'rgba(200,200,200,0.8)';
  c.fillRect(0, h, c_width, c_height/2);
  c.fillStyle = 'rgba(170,170,170,0.8)';
  c.fillRect(0, Math.abs(h-c_height/2), c_width, c_height/2); // Farben der 2 Medium

  if(highlightNumber == 0){
    c.fillStyle = 'rgba(200,200,200,0.8)';
    c.fillRect(0, h, c_width, c_height/2);
  }
  if(highlightNumber == 1){
    c.fillStyle = 'rgba(170,170,170,0.8)';
    c.fillRect(0, Math.abs(h-c_height/2), c_width, c_height/2);
  }

  c.beginPath();
  c.moveTo(0.1*c_width, c_height/2);
  c.lineTo(0.9*c_width, c_height/2);
  c.strokeStyle = 'rgba(10,10,200,0.5)';
  if(highlightNumber == 2) {c.strokeStyle = 'rgba(10,10,200,1)';}
  c.lineWidth = 3;
  c.stroke();


  c.beginPath()
  c.moveTo(c_width/2,0.05*c_height);
  c.lineTo(c_width/2,0.95*c_height);
  c.strokeStyle = 'rgba(0,0,0,0.5)';
  if(highlightNumber == 3) {c.strokeStyle = 'rgba(0,0,0,1)';}
  c.lineWidth = 3;
  c.stroke();

  c.fillStyle = 'rgba(0,0,0,1)'
  c.textAlign = "center";
  c.font = "Arial";
  c.font = "12px Arial";
  c.font = (20*(c_height/500)|0) + 'px Arial';
  c.fillText("optisch", 0.92*c_width, c_height*(d));
  c.fillText("dünneres", 0.92*c_width, c_height*(d+0.04));
  c.fillText("Medium", 0.92*c_width, c_height*(d+0.08));
  c.fillText("optisch", 0.92*c_width, c_height*(f));
  c.fillText("dichteres", 0.92*c_width, c_height*(f+0.04));
  c.fillText("Medium", 0.92*c_width, c_height*(f+0.08));
}

function setupCanvas(canvas) {
  var dpr = window.devicePixelRatio || 1;
  var rect = canvas.getBoundingClientRect();

  canvas.width = 500 * dpr * 0.75;
  canvas.height = 240 * dpr;

  var c = canvas.getContext('2d');

  return c;
}

function calcBi (Bi_actual_value){
  if(Bi_actual_value<100){
    return Math.round(Math.pow(2,Bi_actual_value/100-1)*100)/100;
  }
  return Bi_actual_value/100;
}

function writeValues (b,n,a,Bi1,Bi2,c){
  document.getElementById("Brechungswinkel").innerHTML = Math.round(b*100)/100 + "°";
  document.getElementById("Brechungsindex").innerHTML = Math.round(n*100)/100;
  document.getElementById("angle_value").innerHTML = a + "°";
  document.getElementById("Bi1_value").innerHTML = Bi1;
  document.getElementById("Bi2_value").innerHTML = Bi2;
  document.getElementById("angle_reflection").innerHTML = a + "°";

  var posX_alpha = Math.cos((90+a/2)*Math.PI/180)*c_height*0.1+c_width/2;
  var posY_alpha = -Math.sin((90+a/2)*Math.PI/180)*c_height*0.1+c_height/2;

  var posX_beta = Math.cos((270+b/2)*Math.PI/180)*c_height*0.25+c_width/2;
  var posY_beta = Math.sin((90+a/2)*Math.PI/180)*c_height*0.25+c_height/2;


  c.textAlign = "center";
  c.font = (28*(c_height/500)|0) + 'px Arial';
  c.fillStyle = 'rgba(200,10,10,0.5)';
  if(highlightNumber==7){c.fillStyle = 'rgba(200,10,10,1)';}
  c.fillText("\u03B1", posX_alpha, posY_alpha+8);
  c.fillStyle = 'rgba(240,100,0,0.5)';
  if(highlightNumber==8){c.fillStyle = 'rgba(240,100,0,1)';}
  c.fillText("\u03B2", posX_beta, posY_beta+8);
}
