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

  getNormal(contactPoint) {
    var diff = contactPoint.x - this.pos.x;
    var third = this.width / 3;

    if (diff < third) {
      return new Vector(-0.196, -0.981);
    } else if (diff >= third && diff <= third * 2) {
      return new Vector(0, -1);
    } else if (diff > third * 2){
      return new Vector(0.196, -0.981);
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.vel.mult(0.90);
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