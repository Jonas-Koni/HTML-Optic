window.addEventListener('resize', refresh);
drawCanvasIndex();

function refreshIndex() {
  var canvas = document.getElementById("Strahlensatz");
  var ctx = setupCanvas(canvas);
  drawCanvasIndex();
}
function setupCanvasIndex(canvas) {
  var dpr = window.devicePixelRatio || 1;
  var rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  var ctx = canvas.getContext('2d');

  return ctx;
}
function drawCanvasIndex(){
  var canvas = document.getElementById("index_canvas");
  var ctx = setupCanvasIndex(canvas);
  c_height = canvas.height;
  c_width = canvas.width;

  drawIndexAnimation(ctx);


}


function drawIndexAnimation(ctx) {
  var angle = 0;
  setInterval(function(){
    ctx.clearRect(0,0,c_width,c_height);
    angle += 2;
  },10);
}
