import Vector from './Vector.js';
import Manifold from './Manifold.js';

class Collider {
  constructor(width, height, drawer) {
    this.width = width;
    this.height = height;

    this.drawer = drawer;
  }

  queryBall(ball) {
    var pos = ball.pos;
    var rad = ball.rad;

    if (pos.y - rad < 0 || pos.y + rad > this.height) {
      ball.vel.multVec(new Vector(1, -1));
      return true;
    } else if (pos.x - rad < 0 || pos.x + rad > this.width) {
      ball.vel.multVec(new Vector(-1, 1));
      return true;
    }

    return false;
  }

  queryPaddle(paddle) {
    var pos = paddle.pos;

    if (pos.x < 0) {
      pos.x = 0;
      paddle.vel.mult(0)
    }

    if (pos.x + paddle.width > this.width) {
      pos.x = this.width - paddle.width;
      paddle.vel.mult(0)
    }
  }

  queryRectBall(rect, ball) {
    if (rect === null) {
      return null;
    }

    if (ball.pos.minus(rect.getCenter(rect.pos)).unit().dot(ball.vel.unit()) > 1) {
      return null;
    }

    var rectCorners = rect.getCorners(rect.pos);
    var manifold;

    for (let i = 0; i < 3; i++) {
      var corner1 = rectCorners[i];
      var corner2 = rectCorners[(i + 1) % 4]

      var edge = corner1.minus(corner2);
      manifold = this.queryBallEdge(ball, edge, corner1)
      if (manifold != null) return manifold;

      manifold = this.queryBallPoint(ball, corner1);
      if (manifold != null) return manifold;

      manifold = this.queryBallPoint(ball, corner2);
      if (manifold != null) return manifold;
    }

    return null;
  }

  queryBallPoint(ball, point) {
    var toCorner = point.minus(ball.pos);
    var distance = Math.abs(toCorner.mag());

    if (distance < ball.rad) {
      let normal = toCorner.unit().times(-1);

      var manifold = new Manifold;
      manifold.setPenetration(ball.rad - distance);
      manifold.setContactNormal(normal);
      manifold.setContactPoint(point);
      manifold.setContactType("point");

      return manifold;
    }

    return null;
  }

  queryBallEdge(ball, edge, start) {
    var normal = edge.normal().unit();
    var thread = start.minus(ball.pos);

    var distance = Math.abs(thread.dot(normal));

    if (distance < ball.rad) {
      if ((thread.dot(edge) > 0) && (thread.dot(edge.unit()) - edge.mag() < 0)) {
        var manifold = new Manifold;
        manifold.setPenetration(ball.rad - distance);
        manifold.setContactNormal(normal);

        let distanceToContact = edge.unit().times(thread.dot(edge.unit()));
        manifold.setContactPoint(start.minus(distanceToContact));
        manifold.setContactType("edge");

        return manifold;
      }
    }

    return null;
  }

  getReflection(normal, vel) {
    return vel.minus(normal.times(vel.dot(normal)).times(2))
  }
}

export default Collider;