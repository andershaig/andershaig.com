// Helper Functions
function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function round(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

// Configuration
var backdrop = document.querySelector('.backdrop');
var canvas = document.querySelector('.backdrop-canvas');
var canvasWidth = canvas.width = window.innerWidth;
var canvasHeight = canvas.height = window.innerHeight;  // backdrop.height
var ctx = canvas.getContext('2d');
var heightScale = 0.866;  // Ratio of an equilateral triangle height to base
var hue = 179;
var saturation = 69;
var lightness = 51;
var triSide = 40;
var halfSide = triSide / 2;
var rowHeight = Math.floor(triSide * heightScale);
var columns = Math.ceil(canvasWidth / triSide) + 1;
var rows = Math.ceil(canvasHeight / rowHeight);
var col;
var row;
// TODO: This doesn't normalize correctly, it needs something smarter to end like 2/3 of the way down the page
var deviationStart = [7,10];
var deviationRatio = canvasHeight / (rows + 10);  // Cut off before bottom
var deviationAmount = [];
deviationAmount[0] = deviationStart[0] / deviationRatio;
deviationAmount[1] = deviationStart[1] / deviationRatio;
console.log(deviationAmount);

function render() {
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.lineWidth = 1;

  for (row = 0; row < rows; row++) {
    var deviation = [];
    // TODO: Override with min/max so it doesn't cycle through on tall screens
    deviation[0] = deviationStart[0] - (row * deviationAmount[0]);
    deviation[1] = deviationStart[1] - (row * deviationAmount[1]);

    for (col = 0; col < columns; col++) {
      var x = col * triSide;
      var y = row * rowHeight;
      var clr;

      if (row % 2 != 0) {
        x -= halfSide;
      }

      // upward pointing triangle
      clr = 'hsl(' + hue + ', ' + saturation + '%, ' + round(lightness - deviation[0], lightness + deviation[1]) + '%)';
      ctx.fillStyle = clr;
      ctx.strokeStyle = clr;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + halfSide, y + rowHeight);
      ctx.lineTo(x - halfSide, y + rowHeight);
      ctx.closePath();
      ctx.fill();
      ctx.stroke(); // needed to fill antialiased gaps on edges

      // downward pointing triangle
      clr = 'hsl(' + hue + ', ' + saturation + '%, ' + round(lightness - deviation[0], lightness + deviation[1]) + '%)';
      ctx.fillStyle = clr;
      ctx.strokeStyle = clr;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + triSide, y);
      ctx.lineTo(x + halfSide, y + rowHeight);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };
  };
};

// DOM Ready
ready(function () {
  render();
});

// When resized
window.addEventListener('resize', function () {
  render();
});
