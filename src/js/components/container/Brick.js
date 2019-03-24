import Rect from './Rect';

class Brick extends Rect {
  constructor(pos, width, height) {
    super(width, height)
    this.pos = pos;

    this.health = 3;
    this.colors = {
      1: "rgba(221, 66, 0, 1)",
      2: "rgba(221, 172, 0, 1)",
      3: "rgba(53, 184, 0, 1)"
    }

    this.canDie = true;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.fillStyle = this.colors[this.health];
    ctx.fill();
    ctx.closePath();
  }

  hit() {
    this.health -= 1;
  }
}

export default Brick;