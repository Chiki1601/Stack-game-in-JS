'use strict';
function color(r, g, b)
  {
    this.r=r; this.g=g; this.b=b;
    this.toString = function()
    {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    this.darken=function(darken_by)
    {
      // let main_color = (this.r>this.g&&this.r>this.b)?this.r:(this.g>this.r&&this.g>this.b) ? this.g : this.b;
      if(this.r>this.g&&this.r>this.b)
      {
        return `rgb(${(this.r+darken_by)%255}, ${this.g}, ${this.b})`;
      }
      else if(this.g>this.r&&this.g>this.b)
      {
        return `rgb(${this.r}, ${(this.g+darken_by)%255}, ${this.b})`;
      }
      else{
        return `rgb(${this.r}, ${this.g}, ${(this.b+darken_by)%255})`;
      }
    }
  }
  function intrsctPt(slope1, slope2, line1, line2)
  {
    let c1 = getIntercept(slope1, line1);
    let c2 = getIntercept(slope2, line2);
    let x_cord = (c1-c2)/(slope1-slope2);
    let y_cord = (slope1*Math.abs(x_cord))+c1;
    (x_cord == Infinity)?(console.log(`slope1 = ${slope1}, slope2 = ${slope2}, m1-m2 = ${slope1-slope2}`)):1;
    // (y_cord == Infinity)?(console.log(`slope1 = ${m1}, slope2 = ${m2}, m1-m2 = ${slope1-slope2}`)):1;

    return [Math.abs(x_cord), Math.abs(y_cord)];
  }

  function pts_dist(x1,y1,x2,y2)
  {
    // console.log(`x1-x2 = ${x1-x2}, y1-y2=${y1-y2}`)
    return Math.sqrt(((x1-x2)**2)+((y1-y2)**2));
  }
  function getIntercept(slope, line_cords)
  {
    return (line_cords[1]-(slope*line_cords[0]));
  }
  function platform_cords(x, y, ...sides)
  {
    let l, b, h;
    if(arguments.length==3)
      l=b=h=arguments[2];
    else
      {l=arguments[2];b=arguments[3];h=arguments[4];}

    //calculating the hitbox
    let nc0 = [x, y];
    let nc1 = [nc0[0]-l*cos(30), nc0[1]-l*sin(30)];
    let nc2 = [nc1[0]+b*cos(30), nc1[1]-b*sin(30)];
    let nc3 = [nc2[0]+l*cos(30), nc2[1]+l*sin(30)];

    return [nc0, nc1, nc2, nc3];
  }
  function cos(angle_in_deg)
  {
    return Math.cos((Math.PI*angle_in_deg)/180);
  }
  function sin(angle_in_deg)
  {
    return Math.sin((Math.PI*angle_in_deg)/180);
  }

  // let game={
  //   start_game : ()=>{ game_var = setInterval(draw_frames, 16.6)},
  //   stop_game : ()=>{ clearInterval(game_var)},
  // }
