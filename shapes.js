//draw isometric cuboid
//call by draw_cuboid(ctx, side, x, y, lineWidth, color) or draw_cuboid(ctx, length, breadth, height, x, y, lineWidth, color)
"use strict";

function draw_cuboid(ctx_obj, ...dimens)
{
  let x, y, l, b, h, color;
  if(arguments.length==5) {x=arguments[2]; y=arguments[3]; l=b=h=arguments[1];color=arguments[4];}

  else {x=arguments[4]; y=arguments[5];l=arguments[1];b=arguments[2];h=arguments[3];color=arguments[6]}
  //draw left part
  ctx_obj.beginPath();
  ctx_obj.moveTo(x, y);
  ctx_obj.lineTo(x, y+h);
  ctx_obj.moveTo(x, y);
  let nx = x-l*cos(30), ny = y-l*sin(30);
  ctx_obj.lineTo(nx, ny);
  ctx_obj.lineTo(nx, ny+h);
  ctx_obj.lineTo(x, y+h);
  ctx_obj.fillStyle=color.darken(-110);
  ctx_obj.fill();
  ctx_obj.closePath();

  //draw right part
  ctx_obj.beginPath();
  ctx_obj.moveTo(x, y);
  ctx_obj.lineTo(x, y+h);
  ctx_obj.moveTo(x, y);
  nx = x+b*cos(30), ny = y-b*sin(30);
  ctx_obj.lineTo(nx, ny);
  ctx_obj.lineTo(nx, ny+h);
  ctx_obj.lineTo(x, y+h);
  ctx_obj.fillStyle=color.darken(-55);
  ctx_obj.fill();
  ctx_obj.closePath();

  //draw upper part
  ctx_obj.beginPath();
  ctx_obj.moveTo(x, y);
  nx = x-l*cos(30), ny = y-l*sin(30)
  ctx_obj.lineTo(nx, ny);
  nx = nx+b*cos(30), ny = ny-b*sin(30)
  ctx_obj.lineTo(nx, ny);
  nx = nx+l*cos(30), ny = ny+l*sin(30)
  ctx_obj.lineTo(nx, ny);
  ctx_obj.fillStyle=color.toString();
  ctx_obj.fill();
  ctx_obj.closePath();
  ctx_obj.moveTo(0, 0);
}

// function getPoints(angle, lineLength, x, y){
//
// }
