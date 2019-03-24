class Fade {
  constructor(seconds) {
    this.life = seconds * 1000;
    this.born = Date.now();

    this.step = 1 / this.life;
    this.initialAlpha = null;
    this.complete = false;
  }

  update(drawable) {
    if (this.initialAlpha == null) {
      this.initialAlpha = drawable.alpha;
    }

    var now = Date.now();
    var elapsed = now - this.born;

    if (elapsed >= this.life) {
      this.complete = true;
    }

    var left = this.life - elapsed;
    drawable.alpha = left * this.step;
  }
}

export default Fade;