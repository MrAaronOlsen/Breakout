import Vector from './Vector.js'

const startingEdge = new Vector(0, 75).rotate(20 * (Math.PI / 180))
const totalRadian = 140 * (Math.PI / 180);

class Resolver {

  static resolve(manifold, ball) {
    var penetration = manifold.penetration;
    var contactNormal = manifold.contactNormal;
    var contactPoint = manifold.contactPoint;

    var newVel = Resolver.getReflection(contactNormal.unit(), ball.vel);
    var mtv = contactNormal.times(penetration);

    ball.pos = ball.pos.plus(mtv);
    ball.vel = newVel;
  }

  static resolve_paddle(manifold, paddle, ball, ctx) {
    var penetration = manifold.penetration;
    var contactPoint = manifold.contactPoint;

    var contactNormal;

    if (manifold.contactType === "point") {
      contactNormal = manifold.contactNormal;
    } else {
      contactNormal = paddle.getNormal(contactPoint);
    }

    var newVel = Resolver.getReflection(contactNormal.unit(), ball.vel);
    var mtv = contactNormal.times(penetration);

    ball.pos = ball.pos.plus(mtv);
    ball.vel = newVel;
  }

  static getReflection(normal, vel) {
    return vel.minus(normal.times(vel.dot(normal)).times(2))
  }

  static getHalfReflection(normal, vel) {
    return vel.minus(normal.times(vel.dot(normal)))
  }
}

export default Resolver;