let rs = 100, rm = 200, rh = 300;
let rDot = 5;
let colorR = 255, colorG = 255, colorB = 255;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}

function draw() {
  // Draw three circles for hour, minute, and second representations
  
  let h = hour();
  let m = minute();
  let s = second();
  let xs = map(s, 0, 59, -windowWidth/2+rs, windowWidth/2-rs), ys = -rs;
  let xm = map(m, 0, 59, windowWidth/2-rm, -windowWidth/2+rm), ym = rm/2;
  let xh = map(h, 0, 24, -windowWidth/2+rh, windowWidth/2-rh), yh = rh;
  colorR = map(h, 0, 23, 255, 0); 
  colorG = map(m, 0, 59, 255, 0); 
  colorB = map(s, 0, 59, 255, 0); 
  background(colorR);
  
  strokeWeight(3);
  stroke(colorR,colorG,colorB);
  translate(windowWidth/2, windowHeight/3);
  let [xsDot, ysDot] = drawCircle(xs, ys, rs, 60, s); // sec circle
  let [xmDot, ymDot] = drawCircle(xm, ym, rm, 60, m); // min circle
  let [xhDot, yhDot] = drawCircle(xh, yh, rh, 24, h); // hr circle
  fill(colorR,colorG,colorB, 125);
  triangle(xsDot, ysDot, xmDot, ymDot, xhDot, yhDot);
}

function drawCircle(x, y, r, totalNum, currentNum){
  // Draw a big circle
  fill(255 - colorR, 255 - colorG, 255 - colorB, 125);
  ellipse(x, y, 2*r);
  // Draw a small dot (a filled circle) on the big circle
  let theta = map(currentNum, 0, totalNum, 0, 2*PI); 
  xDot = x + r*sin(theta);
  yDot = y - r*cos(theta);
  fill(colorR,colorG,colorB);
  ellipse(xDot, yDot, 2*rDot);
  return [xDot, yDot]; // return the dot position
}
