var information_marginLeft_to_navigation = 20;

var navigation = document.getElementById("navigation");
var information = document.getElementById("information");
var footer = document.getElementById("footer");
var footer_style = window.getComputedStyle(footer);
var information_style = window.getComputedStyle(information);
var header = document.getElementById("header");

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
var author_text = document.getElementById("author").innerHTML = "Autor: " + author_name.content;

window.addEventListener('resize', refresh);

function refresh() {
  navigation_height = navigation.offsetHeight;
  information.style.minHeight = navigation_height - footer_height - footer_marginTop - information_marginTop - information_marginBottom - 2;
  console.log("hi");

}

var c_height;
var c_width;

function setupCanvas(canvas) {
  var dpr = window.devicePixelRatio || 1;
  var rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr * 0.75;
  canvas.height = rect.height * dpr;

  var c = canvas.getContext('2d');
  return c;
}
  var canvas = document.getElementById("Reflection");
  var c = setupCanvas(canvas);
  var c_height = canvas.height;
  var c_width = canvas.width;

  c.fillStyle = 'rgba(200,200,200,0.8)';
  c.fillRect(0, 0, c_width, c_height/2);
  c.fillStyle = 'rgba(170,170,170,0.8)';
  c.fillRect(0, c_height/2, c_width, c_height/2);

  c.beginPath();
  c.moveTo(0.1*c_width, c_height/2);
  c.lineTo(0.9*c_width, c_height/2);
  c.strokeStyle = 'rgba(10,10,200,0.5)';
  c.lineWidth = 3;
  c.stroke();


  c.beginPath()
  c.moveTo(c_width/2,0.05*c_height);
  c.lineTo(c_width/2,0.95*c_height);
  c.strokeStyle = 'rgba(0,0,0,0.5)';
  c.lineWidth = 3;
  c.stroke();




  var Bi1 = 0.2 //Brechungsindex
  var Bi2 = 0.5;

  var n = Bi1/Bi2; //n = Brechzahl
  if(n<1){
    n = Math.pow(n,-1);
  }
  var a = 45; //Einfallswinkel in Grad
  var sin_x_n = Math.sin(a*Math.PI/180)/n;
  var b = Math.asin(sin_x_n)*180/Math.PI;

  var posX_alpha = Math.cos((90+a/2)*Math.PI/180)*c_height*0.1+c_width/2;
  var posY_alpha = -Math.sin((90+a/2)*Math.PI/180)*c_height*0.1+c_height/2;

  var posX_beta = Math.cos((270+b/2)*Math.PI/180)*c_height*0.25+c_width/2;
  var posY_beta = Math.sin((90+a/2)*Math.PI/180)*c_height*0.25+c_height/2;

  c.textAlign = "center";
  c.font = "40px Arial";
  c.fillStyle = 'rgba(200,10,10,0.5)';
  c.fillText("\u03B1", posX_alpha, posY_alpha);
  c.fillStyle = 'rgba(240,100,0,0.5)';
  c.fillText("\u03B2", posX_beta, posY_beta);

  x = Math.cos((90+a)*Math.PI/180)*c_height*0.4;
  y = -Math.sin((90+a)*Math.PI/180)*c_height*0.4;

  c.font = "10 Arial";
  c.fillStyle = 'rgba(0,0,0,1)'

  var d = 0.1; //dünneres
  var f = 0.86; //dickeres

  c.font = "Arial";
  c.font = "font_size";
  c.fillText("optisch", 0.92*c_width, c_height*(d));
  c.fillText("dünneres", 0.92*c_width, c_height*(d+0.04));
  c.fillText("Medium", 0.92*c_width, c_height*(d+0.08));
  c.fillText("optisch", 0.92*c_width, c_height*(f));
  c.fillText("dichteres", 0.92*c_width, c_height*(f+0.04));
  c.fillText("Medium", 0.92*c_width, c_height*(f+0.08));

  c.beginPath();
  c.moveTo(x+c_width/2,y+c_height/2);
  c.lineTo(c_width/2,c_height/2);
  c.strokeStyle = 'rgba(200,10,10,0.5)';
  c.stroke();

  c.beginPath();
  c.moveTo(-x+c_width/2,y+c_height/2);
  c.lineTo(c_width/2,c_height/2)
  c.strokeStyle = 'rgba(30,140,20,0.5)';
  c.stroke();

  x = Math.cos((270+b)*Math.PI/180)*c_height*0.4;
  y = -Math.sin((270+b)*Math.PI/180)*c_height*0.4;

  c.beginPath();
  c.moveTo(x+c_width/2,y+c_height/2);
  c.lineTo(c_width/2,c_height/2)
  c.strokeStyle = 'rgba(240,100,0,0.5)';
  c.stroke();

  c.beginPath();
  c.moveTo(Math.cos((90+a)*Math.PI/180)*c_height*0.2+c_width/2,-Math.sin((90+a)*Math.PI/180)*c_height*0.2+c_height/2);
  c.arc(c_width/2,c_height/2,c_height*0.2,(270-a)*Math.PI/180,(270)*Math.PI/180,false);
  c.strokeStyle = 'rgba(200,10,10,0.5)';
  c.stroke();

  c.beginPath();
  c.moveTo(c_width/2,c_height*0.8);
  c.arc(c_width/2,c_height/2,c_height*0.3,Math.PI/2,(90-b)*Math.PI/180,true);
  c.strokeStyle = 'rgba(240,100,0,0.5)';
  c.stroke();
