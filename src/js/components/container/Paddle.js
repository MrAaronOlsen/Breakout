import Vector from './Vector.js'
import Rect from './Rect.js'

class Paddle extends Rect {
  constructor(pos) {
    super(75, 10)

    this.pos = pos;
    this.vel = new Vector();

    this.canDie = false;
  }

  getMid() {
    return this.pos.plus(new Vector(this.width / 2, 0))
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.vel.mult(0.92);
    this.pos.add(this.vel);

    if (this.vel.x > 7) {
      this.vel.x = 7
    }

    if (this.vel.x < -7) {
      this.vel.x = -7
    }
  }
}

export default Paddle;