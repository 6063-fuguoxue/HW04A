let rs = 100, rm = 200, rh = 300;
let rDot = 5;
let colorR = 255, colorG = 255, colorB = 255;
let h=0, m=0, s=0;
let xs=0, xm=0, xh=0;
let BGcolor = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  h = hour();
  m = minute();
  s = second();
  rh = windowHeight/3;
  rm = windowHeight/6;
  rs = windowHeight/9;

  // Translate the canvas
  translate(windowWidth/2, windowHeight/3);

  // Set positions of three circles
  xs = map(s, 0, 59, -windowWidth/2+rs, windowWidth/2-rs), ys = -rs;
  xm = map(m, 0, 59, -windowWidth/2+rm, windowWidth/2-rm), ym = rm/2;
  xh = map(h, 0, 23, -windowWidth/2+rh, windowWidth/2-rh), yh = rh;
  // Time controls colors on canvas
  colorR = map(h, 0, 23, 255, 0); 
  colorG = map(m, 0, 59, 255, 0); 
  colorB = map(s, 0, 59, 255, 0); 
  // Background change color based on hour
  if (h<12) {
    BGcolor = map(colorR, 0, 255, 510, 0);
  } else {
    BGcolor = map(colorR, 0, 255, 0, 510);
  }
  background(BGcolor);
  
  strokeWeight(3);
  // Set stroke color
  stroke(colorR,colorG,colorB);

  // Draw three circles for hour, minute, and second representations
  // Get the position of the three dots on the circles, which represent the current second, minute, and hour
  let [xsDot, ysDot] = drawCircle(xs, ys, rs, 60, s); // sec circle + dot
  let [xmDot, ymDot] = drawCircle(xm, ym, rm, 60, m); // min circle + dot
  let [xhDot, yhDot] = drawCircle(xh, yh, rh, 24, h); // hr circle + dot
  // Set triangle color same as stroke color, but alpha value = 125
  fill(colorR,colorG,colorB, 125);

  // Draw triangle
  triangle(xsDot, ysDot, xmDot, ymDot, xhDot, yhDot);
}

function drawCircle(x, y, r, totalNum, currentNum){
  // Draw a big circle
  fill(255 - colorR, 255 - colorG, 255 - colorB, 125); // Fill the circle with the complementary color of the stroke's color
  ellipse(x, y, 2*r);

  // Draw a dot (a filled small circle) on the big circle
  let theta = map(currentNum, 0, totalNum, 0, 2*PI); 
  // Position of dot changes with time
  xDot = x + r*sin(theta);
  yDot = y - r*cos(theta);
  fill(colorR,colorG,colorB);
  ellipse(xDot, yDot, 2*rDot);
  return [xDot, yDot]; // return the dot position
}
