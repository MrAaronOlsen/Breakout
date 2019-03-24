import Vector from './Vector';

class Rect {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.center = new Vector(this.width / 2, this.height / 2);
  }

  getCorners(pos) {
    return [
      new Vector(pos.x, pos.y),
      new Vector(pos.x + this.width, pos.y),
      new Vector(pos.x + this.width, pos.y + this.height),
      new Vector(pos.x, pos.y + this.height)
    ]
  }

  getCenter(pos) {
    return pos.plus(this.center);
  }
}

export default Rect