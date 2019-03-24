import Vector from './Vector.js'
import Brick from './Brick.js'

class Bricks {
  constructor(layout) {
    this.layout = layout;
    this.offset = new Vector(30, 30);

    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;

    this.build()
  }

  build() {
    for (let i = 0; i < this.layout.length; i++) {
      let row = this.layout[i];

      for (let j = 0; j < row.length; j++) {
        if (row[j] === 1) {
          row[j] = new Brick(this.getPos(i, j), this.brickWidth, this.brickHeight)
        } else {
          row[j] = null;
        }
      }
    }
  }

  getPos(row, col) {
    var x = this.offset.x + (col * (this.brickWidth + this.brickPadding))
    var y = this.offset.y + (row * (this.brickHeight + this.brickPadding))

    return new Vector(x, y)
  }

  draw(ctx) {
    this.layout.forEach(row => {
      row.forEach(brick => {
        if (brick !== null) {
          brick.draw(ctx);
        }
      })
    })
  }
}

export default Bricks;