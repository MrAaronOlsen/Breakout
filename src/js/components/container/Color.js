class Color {
  constructor(red = 0, blue = 0, green = 0, alpha = 1) {
    this.red = red;
    this.blue = blue;
    this.green = green;
    this.alpha = alpha;
  }

  toString() {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`
  }
}

export default Color;