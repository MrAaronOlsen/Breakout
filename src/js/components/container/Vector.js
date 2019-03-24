class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  mult(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }

  multVec(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  plus(vector) {
    return new Vector(
      this.x + vector.x,
      this.y + vector.y
    )
  }

  minus(vector) {
    return new Vector(
      this.x - vector.x,
      this.y - vector.y
    )
  }

  times(scalar) {
    return new Vector(
      this.x * scalar,
      this.y * scalar
    )
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  normal() {
    return new Vector(-this.y, this.x)
  }

  unit() {
    var m = this.mag();
    return m === 0 ? new Vector(this.x, this.y) : new Vector(this.x / m, this.y / m);
  }

  dot(vector) {
    return (this.x * vector.x) + (this.y * vector.y)
  }
}

export default Vector;