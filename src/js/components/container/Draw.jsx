import React, { Component } from "react";
import ReactDOM from "react-dom";

import Canvas from "../presentational/Canvas.jsx";

import Vector from './Vector.js'
import Collider from './Collider.js'
import Resolver from './Resolver.js'
import Ball from './Ball.js'
import Paddle from './Paddle.js'
import Board from './Board.js'

import './draw.scss'

class Draw extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.thingsToDraw = [];
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    this.ctx = canvas.getContext("2d");

    this.width = canvas.width;
    this.height = canvas.height;

    this.collider = new Collider(this.width, this.height, this)

    var ballPos = new Vector(this.width / 2, this.height - 100);
    this.ball = new Ball(ballPos, 10);
    this.ball.setVel(new Vector(3, 3));

    var paddlePos = new Vector(this.width/2, this.height - 30);
    this.paddle = new Paddle(paddlePos);

    this.layout = [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1]
    ];

    this.board = new Board(this.layout);

    document.addEventListener("keydown", this.keyDown.bind(this), false);

    this.loop();
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
    this.ball.draw(ctx);
    this.paddle.draw(ctx);
    this.board.draw(ctx);
  }

  drawHard() {
    this.draw(this.ctx);
  }

  update() {
    this.collider.queryBall(this.ball);
    this.collider.queryPaddle(this.paddle);

    let manifold = this.collider.queryRectBall(this.paddle, this.ball);
    if (manifold != null) {
      Resolver.resolve_paddle(manifold, this.paddle, this.ball);
    }

    this.board.layout.forEach(row => {
      row.forEach((block, index, array) => {
        let manifold = this.collider.queryRectBall(block, this.ball);
        if (manifold != null) {
          Resolver.resolve(manifold, this.ball);
          block.hit();

          if (block.health === 0) {
            array[index] = null;
          }
        }
      })
    })

    this.ball.update();
    this.paddle.update();
  }

  keyDown(key) {
    if (key.key === 'Right' || key.key === 'ArrowRight') {
      this.paddle.vel.add(new Vector(7, 0))
    }

    if (key.key === 'Left' || key.key === 'ArrowLeft') {
      this.paddle.vel.add(new Vector(-7, 0))
    }
  }

  loop() {
    this.draw(this.ctx);
    this.update();

    requestAnimationFrame(this.loop.bind(this));
  }

  render() {
    return (
      <Canvas name="canvas" width="390" height="400" ref={this.canvasRef}/>
    );
  }
}

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<Draw />, wrapper) : false;