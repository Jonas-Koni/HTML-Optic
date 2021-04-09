window.addEventListener('resize', refresh);

function refresh() {
  var canvas = document.getElementById("Schatten");
  var ctx = setupCanvas(canvas);
  drawCanvas();
}

drawCanvas();

function drawCanvas(){
  var canvas = document.getElementById("Schatten");
  var ctx = setupCanvas(canvas);
  c_height = canvas.height;
  c_width = canvas.width;
  var box1 = createBox();

  setupCanvas(canvas);
  drawCanvasBox(ctx, box1);
  drawCanvasLichtquellen(ctx, getAnzahlLichtquellen(), c_width, c_height);
  drawCanvasSchatten(ctx, box1, c_width, c_height, getAnzahlLichtquellen());
  writeValues(box1);
}

function box(topLeftX, topLeftY, size){
  this.topLeftX = topLeftX;
  this.topLeftY = topLeftY;
  this.size = size;
}

function createBox(){
  var size = parseInt(document.getElementById("getSize").value)*10;
  var topLeftX = c_width*parseInt(document.getElementById("getVerschiebungX").value)/10;
  var topLeftY = c_height*parseInt(document.getElementById("getVerschiebungY").value)/10;
  return new box(topLeftX, topLeftY, size);

}




function getPosXLichtquelle(c_width){
  return c_width*0.11;
}


function setupCanvas(canvas) {
  var dpr = window.devicePixelRatio || 1;
  var rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  var ctx = canvas.getContext('2d');

  return ctx;
}

function getAnzahlLichtquellen(){
  return parseFloat(document.getElementById("getAnzahlLichtquellen").value);
}

function getPosYLichtquelle(AnzahlLichtquellen, LichtquellenNummer){
  var relativePosition = LichtquellenNummer/(AnzahlLichtquellen + 1);
  var heightLichtquellenBrett = c_height*0.8;
  var startLichquellenBrett = (c_height-heightLichtquellenBrett)/2;
  return relativePosition*heightLichtquellenBrett + startLichquellenBrett;
}

function drawCanvasBox(ctx, box1){
  ctx.beginPath();
  ctx.rect(box1.topLeftX-box1.size/2, box1.topLeftY-box1.size/2, box1.size, box1.size);
  ctx.fillStyle = "blue"
  ctx.fill();
}

function drawCanvasLichtquellen(ctx, AnzahlLichtquellen, c_width, c_height){
  for(var i = 1; i <= AnzahlLichtquellen; i ++){
    ctx.beginPath();
    ctx.arc(getPosXLichtquelle(c_width), getPosYLichtquelle(AnzahlLichtquellen,i), c_width*0.01, 0, Math.PI*2, true);
    ctx.fillStyle = "rgba(255, 190, 20, 1)"
    ctx.fill();
  }
}

function drawCanvasSchatten(ctx, box1, c_width, c_height, AnzahlLichtquellen){
  for (var i = 1; i < AnzahlLichtquellen+1; i++) {
    var posYLicht = getPosYLichtquelle(AnzahlLichtquellen, i);
    var posXLicht = getPosXLichtquelle(c_width);
    var widthShadow = c_width - posXLicht;
    var size = box1.size;
    var topLeftX = box1.topLeftX-size/2;
    var topLeftY = box1.topLeftY-size/2;
    var opacity = 0.75/AnzahlLichtquellen

    if(posYLicht >= topLeftY && posYLicht <= topLeftY + size){
      var UpperSteigung = -(topLeftY-posYLicht)/(topLeftX-posXLicht);
      var DownerSteigung = (topLeftY+size-posYLicht)/(topLeftX-posXLicht);
      var UpperRightBorderY = posYLicht - widthShadow*UpperSteigung;
      var DownerRightBorderY = posYLicht + widthShadow*DownerSteigung;
      ctx.beginPath();
      ctx.moveTo(topLeftX, topLeftY);
      ctx.lineTo(c_width, UpperRightBorderY);
      ctx.lineTo(c_width, DownerRightBorderY);
      ctx.lineTo(topLeftX, topLeftY+size);
      ctx.lineTo(topLeftX+size, topLeftY+size);
      ctx.lineTo(topLeftX+size, topLeftY);
      ctx.fillStyle = "rgba(0,0,0,"+opacity+")";
      ctx.strokeStyle = "rgba(255,0,0,0.1)";
      ctx.fill();
    } else if(posYLicht <= topLeftY){
      var UpperSteigung = -(topLeftY-posYLicht)/(topLeftX-posXLicht+size);
      var DownerSteigung = (topLeftY+size-posYLicht)/(topLeftX-posXLicht);
      var UpperRightBorderY = posYLicht - widthShadow*UpperSteigung;
      var DownerRightBorderY = posYLicht + widthShadow*DownerSteigung;
      ctx.beginPath();
      ctx.moveTo(topLeftX+size, topLeftY);
      ctx.lineTo(c_width, UpperRightBorderY);
      ctx.lineTo(c_width, DownerRightBorderY);
      ctx.lineTo(topLeftX, topLeftY+size);
      ctx.lineTo(topLeftX, topLeftY+size);
      ctx.lineTo(topLeftX+size, topLeftY+size);
      ctx.fillStyle = "rgba(0,0,0,"+opacity+")";
      ctx.strokeStyle = "rgba(0,255,0,0.1)";
      ctx.fill();
    } else {
      var UpperSteigung = -(topLeftY-posYLicht)/(topLeftX-posXLicht);
      var DownerSteigung = (topLeftY+size-posYLicht)/(topLeftX-posXLicht+size);
      var UpperRightBorderY = posYLicht - widthShadow*UpperSteigung;
      var DownerRightBorderY = posYLicht + widthShadow*DownerSteigung;
      ctx.beginPath();
      ctx.moveTo(topLeftX, topLeftY);
      ctx.lineTo(c_width, UpperRightBorderY);
      ctx.lineTo(c_width, DownerRightBorderY);
      ctx.lineTo(topLeftX+size, topLeftY+size);
      ctx.lineTo(topLeftX+size, topLeftY);
      ctx.fillStyle = "rgba(0,0,0,"+opacity+")";
      ctx.strokeStyle = "rgba(0,0,255,1)";
      ctx.fill();
    }

  }
}

function writeValues(box1){
  document.getElementById("setAnzahlLichtquellen").innerHTML = getAnzahlLichtquellen();
  document.getElementById("setVerschiebungX").innerHTML = box1.topLeftX-box1.size/2;
  document.getElementById("setVerschiebungY").innerHTML = box1.topLeftY+box1.size;
  document.getElementById("setSize").innerHTML = box1.size;
}
