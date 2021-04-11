window.addEventListener('resize', refresh);
var zurueck;

drawCanvasStrahlensatz();

function refresh() {
  var canvas = document.getElementById("Strahlensatz");
  var ctx = setupCanvas(canvas);
  drawCanvasStrahlensatz();
}

function setupCanvas(canvas) {
  var dpr = window.devicePixelRatio || 1;
  var rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  var ctx = canvas.getContext('2d');

  return ctx;
}

function drawCanvasStrahlensatz(){
  var canvas = document.getElementById("Strahlensatz");
  var ctx = setupCanvas(canvas);
  c_height = canvas.height;
  c_width = canvas.width;
  ctx.beginPath();
  ctx.rect(0,0,500,200);
  ctx.fill();
  drawAnimation(ctx);
  ctx.beginPath();
  ctx.rect(0,0,500,200);
  ctx.fill();

}

function drawLichtquelle(ctx){
  ctx.beginPath();
  ctx.arc(c_width*0.2,c_height/2, 20, 0, Math.PI*2, true);
  ctx.fillStyle = "rgba(255, 190, 20, 1)";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(c_width*0.2,c_height/2, 20, 0, Math.PI*2, true);
  ctx.strokeStyle = "rgba(0, 0, 0, 1)";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(20*Math.cos(Math.PI*1.25)+c_width*0.2, 20*Math.sin(Math.PI*1.25)+c_height/2);
  ctx.lineTo(20*Math.cos(Math.PI*0.25)+c_width*0.2, 20*Math.sin(Math.PI*0.25)+c_height/2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(20*Math.cos(Math.PI*1.75)+c_width*0.2, 20*Math.sin(Math.PI*1.75)+c_height/2);
  ctx.lineTo(20*Math.cos(Math.PI*0.75)+c_width*0.2, 20*Math.sin(Math.PI*0.75)+c_height/2);
  ctx.stroke();
}

function drawAbstandG(ctx, AbstandG){
  var BreiteB = 0.75*AbstandG;
  ctx.beginPath();
  ctx.moveTo(c_width*0.2,c_height/2);
  ctx.lineTo(c_width*0.2+AbstandG,c_height/2+BreiteB/2);
  ctx.lineTo(c_width*0.2+AbstandG,c_height/2-BreiteB/2);
  ctx.fillStyle = "rgba(255, 190, 20, 1)";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(c_width*0.2,c_height/2);
  ctx.lineTo(c_width*0.2 + AbstandG, c_height/2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(c_width*0.2+AbstandG,c_height/2-BreiteB/2);
  ctx.lineTo(c_width*0.2+AbstandG,c_height/2+BreiteB/2);
  ctx.stroke();
  writeValuesStrahlensatz(BreiteB, AbstandG);
}

function drawAnimation(ctx) {
  var AbstandG = 9;
  setInterval(function(){
    ctx.clearRect(0,0,c_width,c_height);
    if(AbstandG>c_width*0.8){
      zurueck = true;
    }
    if(AbstandG<10){
      zurueck = false;
    }
    if(zurueck){
      AbstandG -= 2;
    } else {
      AbstandG += 2;
    }
    drawAbstandG(ctx,AbstandG);
    drawLichtquelle(ctx);
  },1);
}

function writeValuesStrahlensatz(BreiteB, GeradeG){
  document.getElementById("Breite").innerHTML = BreiteB;
  document.getElementById("Gerade").innerHTML = GeradeG;
  document.getElementById("Verhaeltnis").innerHTML = BreiteB/GeradeG;
}
