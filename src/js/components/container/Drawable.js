import Color from './Color.js';

class Drawable {
  constructor() {
    this.drawables = [];
  }

  draw(ctx) {
    this.drawables.forEach(drawable => {
      effect.update(this);
    })
  }
}

export default Drawable;