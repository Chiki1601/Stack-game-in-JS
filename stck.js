"use strict";
let brd = document.getElementById("gme-ar");
let game_over=false;
brd.style.border="1px solid black";
brd.addEventListener('click', ()=>{grow_stack()});
let ctx = brd.getContext("2d");
let wobble_dist = 440, turn=1, score_stack = [], dist_cov=320, wobble_dir=+!+[], speed=5,stack_piece_height=20, stack_piece_length=200, stack_piece_breadth=200;
let st = 0;
let posX = st?300:300+150;
let posY = st?400:400+50;
let game={
  start_game : ()=>{ spawn_piece();game.game_var = setInterval(draw_frames, 16.6)},
  stop_game : ()=>{ clearInterval(game.game_var)},
}


let stack=[];
function stack_piece(l, b, h, p, q, color)
{
  this.l=l, this.b=b, this.p=p, this.q=q, this.h=h, this.color=color, this.h1=this.h2=this.h3=this.h4=0;
  this.draw=()=>{draw_cuboid(ctx, this.l, this.b, this.h, this.p, this.q, this.color);}
  this.m = [], this.c = [];
  Object.defineProperty(this, "__hitboxCords__",
  {
    get(){
      let nc0 = [this.p, this.q];
      let nc1 = [nc0[0]-l*cos(30), nc0[1]-l*sin(30)];
      let nc2 = [nc1[0]+b*cos(30), nc1[1]-b*sin(30)];
      let nc3 = [nc2[0]+l*cos(30), nc2[1]+l*sin(30)];
      return [...nc0, ...nc1, ...nc2, ...nc3];
    }
  });
  function cal_m(s_p)
  {
    let cords = s_p.__hitboxCords__;
    s_p.m.push((cords[3]-cords[1])/(cords[2]-cords[0]));
    s_p.m.push((cords[5]-cords[3])/(cords[4]-cords[2]));
    s_p.m.push((cords[5]-cords[7])/(cords[4]-cords[6]));
    s_p.m.push((cords[7]-cords[1])/(cords[6]-cords[0]));

  }
  cal_m(this);
}
function spawn_piece()
{
  turn = (turn+1)%2;
  let c1 = new color((Math.random()*1000)%255,(Math.random()*1000)%255,(Math.random()*1000)%255);
  console.log(`spawning at posX = ${posX}, posY = ${posY}`);
  stack.push(new stack_piece(stack_piece_length, stack_piece_breadth, stack_piece_height, posX, posY/*-((stack.length-1)*stack_piece_height)*/, c1));
  // console.log(`New Piece Spawned at ${stack.slice(-1).pop().p}`)
  dist_cov=220;
  // console.log(`dist_cov = ${dist_cov}`);
  wobble_dir=1;
}
function grow_stack()
{
  //calculating new length and breadth;
  let top = stack.slice(-1).pop(), bott = stack[stack.length-2];
  let top_h = top.__hitboxCords__, bott_h = bott.__hitboxCords__;
  console.log(`turn = ${turn}`);
  let cord_set_1, cord_set_2;
  if(turn==0)
  {

    if((top_h[6]-bott_h[0])<0||(top_h[0])>bott_h[6])
    {
        //gameOver
        game_over=true;
        stack.pop();
        game.stop_game();

    }
    if(top_h[0]-bott_h[0]<0)
    {
      // console.log(`the top one is downwards slantwise`)
      //the top one is downwards slantwise
      // top's 3 and bottom's 0
      cord_set_1 = intrsctPt(top.m[3], bott.m[0], [top_h[6], top_h[7]+stack_piece_height], [bott_h[0], bott_h[1]]);
      //top's 1 and bottom's 0
      cord_set_2 = intrsctPt(top.m[1], bott.m[0], [top_h[2], top_h[3]+stack_piece_height], [bott_h[0], bott_h[1]]);
      let new_brdt = pts_dist(...cord_set_1, top_h[6], top_h[7]+stack_piece_height);

      top.b = (new_brdt>top.b||new_brdt == top.b)?top.b:new_brdt;
      stack_piece_breadth=top.b;
      top.p = cord_set_1[0], top.q = cord_set_1[1]-stack_piece_height;
      posX = top.p, posY=top.q-stack_piece_height;

    }
    else{
      // console.log(`the top one is upwards slantwise`);
      //the top one is upwards slantwise
      // top's 3 and bottom's 2
      cord_set_1 = intrsctPt(top.m[3], bott.m[2], [top_h[6], top_h[7]+stack_piece_height], [bott_h[4], bott_h[5]]);
      // top's 1 and bottoms' 2
      cord_set_2 = intrsctPt(top.m[1], bott.m[2], [top_h[2], top_h[3]+stack_piece_height], [bott_h[4], bott_h[5]]);

      let new_brdt = pts_dist(...cord_set_1, top_h[0], top_h[1]+stack_piece_height);
      top.b = (new_brdt>top.b||new_brdt==top.b)?top.b:new_brdt;
      stack_piece_breadth=top.b;
      posX = top.p, posY=top.q-stack_piece_height;

    }

  }

  else
  {
      if(top_h[2]>bott_h[0]||(top_h[0])<bott_h[2])
      {
          //gameOver
          stack.pop();
          game_over=true;
          game.stop_game();

      }
    // console.log(`top_h[0]-bott_h[0] = ${top_h[0]-bott_h[0]}, top_h[1]-bott_h[1] = ${top_h[1]-bott_h[1]}`);
    if(top_h[0]-bott_h[0]>0)
    {
      //top's 0 and bottom 3
      cord_set_1 = intrsctPt(top.m[0], bott.m[3], [top_h[0], top_h[1]+stack_piece_height], [bott_h[6], bott_h[7]]);
      //top's 2 and bottom 3
      cord_set_2 = intrsctPt(top.m[2], bott.m[3], [top_h[4], top_h[5]+stack_piece_height], [bott_h[6], bott_h[7]]);
      //this only changes its length
      let new_len = pts_dist(...cord_set_1, top_h[2], top_h[3]+stack_piece_height);
      top.l = (top.l<new_len||top.l==new_len)?top.l:new_len;

      stack_piece_length=top.l;
      top.p = cord_set_1[0], top.q = cord_set_1[1]-stack_piece_height;
      posX = top.p, posY=top.q-stack_piece_height;

    }
    else{
      //top's 0 and bottom 1
      cord_set_1 = intrsctPt(top.m[0], bott.m[1], [top_h[0], top_h[1]+stack_piece_height], [bott_h[2], bott_h[3]]);
      //top's 2 and bottom 1
      cord_set_2 = intrsctPt(top.m[2], bott.m[1], [top_h[4], top_h[5]+stack_piece_height], [bott_h[2], bott_h[3]]);
      let new_len = pts_dist(...cord_set_1, top_h[0], top_h[1]+stack_piece_height);
      top.l = (new_len>top.l||top.l==new_len)?top.l:new_len;
      stack_piece_length=top.l;
      posX = top.p, posY=top.q-stack_piece_height;
    }
  }

  game_over? score_div.innerHTML="<b>GAME OVER! Score : </b>"+(stack.length-1): score_div.innerHTML="<b>Score : </b>"+(stack.length-1);
  spawn_piece();

}

function draw_frames()
{
  ctx.clearRect(+[], +[], 1000, 600);
  for(let i=0; i<stack.length-1; i++)
  {
    stack[i].draw();
  }
  let piece = stack.slice(-1).pop();

  let m = turn?piece.m[0]:piece.m[3];
  piece.p += wobble_dir?speed*(Math.cos(Math.atan(m))):-(speed*(Math.cos(Math.atan(m))));
  piece.q += wobble_dir?speed*(Math.sin(Math.atan(m))):-(speed*(Math.sin(Math.atan(m))));
  piece.draw();
  dist_cov += speed;
  if(dist_cov>wobble_dist)
  {
    dist_cov=+[];
    wobble_dir = wobble_dir?+[]:+!+[];
  }
}
// brd.setAttribute('click', ()=>{/*spawn_piece();*/console.log("YAY")})
game.start_game();
posY-=stack_piece_height;
spawn_piece();
