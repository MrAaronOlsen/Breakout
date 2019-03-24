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

  static resolve_paddle(manifold, paddle, ball) {
    var penetration = manifold.penetration;
    var contactNormal = manifold.contactNormal;
    var contactPoint = manifold.contactPoint;

    var diff = contactPoint.minus(paddle.getMid());
    var contactNormal = ball.vel.times(-1);

    var newVel = Resolver.getReflection(contactNormal.unit(), ball.vel);
    var mtv = contactNormal.times(penetration);

    ball.pos = ball.pos.plus(mtv);
    ball.vel = newVel;
  }

  static getReflection(normal, vel) {
    return vel.minus(normal.times(vel.dot(normal)).times(2))
  }
}

export default Resolver;