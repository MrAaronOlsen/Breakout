import Vector from './Vector.js'

class Ball {
  constructor(pos, rad) {
    this.rad = rad;
    this.pos = pos;
    this.vel = new Vector();
  }

  setVel(vel) {
    this.vel = vel
  }

  update() {
    this.pos.add(this.vel)
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.rad, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
}

export default Ball;