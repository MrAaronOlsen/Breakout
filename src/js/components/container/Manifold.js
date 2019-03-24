import Drawable from './Drawable.js'
import Color from './Color.js'
import Fade from './effects/Fade.js'

class Manifold {
  constructor() {
    this.penetration = 0;
    this.contactNormal = null;
    this.contactPoint = null;
    this.contact = false;
  }

  setPenetration(penetration) {
    this.penetration = penetration;
  }

  setContactNormal(normal) {
    this.contactNormal = normal;
  }

  setContactPoint(point) {
    this.contactPoint = point;
  }

  setContact() {
    this.contact = true;
  }
}

export default Manifold;