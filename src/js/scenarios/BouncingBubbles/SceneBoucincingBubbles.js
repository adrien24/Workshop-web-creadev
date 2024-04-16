import { randomRange, distance2d } from "../../Utils/MathUtils";
import Scene2D from "../../canvas-2d/Scene2D";
import { circle, line } from "../../canvas-2d/Shapes2D";

class Bubble {
  constructor(context, x, y, radius) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = radius;

    // animate
    this.vx = randomRange(-500, 500);
    this.vy = randomRange(-500, 500);
  }

  update(width, height, deltaTime = 16, speed = 1) {
    this.x += (this.vx * speed * deltaTime) / 1000;
    this.y += (this.vy * speed * deltaTime) / 1000;

    this.vx = this.x < this.radius ? Math.abs(this.vx) : this.vx;
    this.vx = this.x > width - this.radius ? -Math.abs(this.vx) : this.vx;
    this.vy = this.y < this.radius ? Math.abs(this.vy) : this.vy;
    this.vy = this.y > height - this.radius ? -Math.abs(this.vy) : this.vy;
  }

  drawBubble(bubble) {
    circle(this.context, bubble.x, bubble.y, bubble.radius, {
      isStroke: true,
      isFill: true,
    });
  }
}

export default class SceneBouncingBubbles extends Scene2D {
  constructor(nBubbles, id = "canvas-scene") {
    super(id);

    this.bubbles = [];

    // debug
    this.params.threshold = 75;
    this.params.speed = 1;
    this.params.radius = 10;
    this.params.strokeWeight = 2;
    this.params.bubbleCount = nBubbles;
    if (this.debug.active) {
      this.debugFolder.add(this.params, "threshold", 0, 350).name("Threshold");
      this.debugFolder.add(this.params, "speed", 0, 3).name("Speed");
      this.debugFolder
        .add(this.params, "radius", 0, 20)
        .name("Radius")
        .onChange(() => {
          this.bubbles.forEach((b) => {
            b.radius = this.params.radius;
            this.clear();
            this.draw();
          });
        });
      this.debugFolder
        .add(this.params, "bubbleCount", 1, 100)
        .name("Number of Bubbles")
        .onFinishChange(() => {
          this.generateBubbles();
          this.clear();
          this.draw();
        });
      this.debugFolder
        .add(this.params, "strokeWeight", 1, 15)
        .name("Stroke Weight")
        .onChange(() => {
          this.bubbles.forEach((b) => {
            b.strokeWeight = this.params.strokeWeight;
            this.clear();
            this.draw();
          });
        });
    }
    this.generateBubbles();
  }

  generateBubbles() {
    const currentBubbleCount = this.bubbles.length;

    if (currentBubbleCount < this.params.bubbleCount) {
      // Ajouter des bulles
      for (let i = 0; i < this.params.bubbleCount - currentBubbleCount; i++) {
        const radius = this.params.radius;
        const x = randomRange(radius, this.width - radius);
        const y = randomRange(radius, this.height - radius);
        const bubble = new Bubble(this.context, x, y, radius);
        this.bubbles.push(bubble);
      }
    } else if (currentBubbleCount > this.params.bubbleCount) {
      // Supprimer des bulles
      this.bubbles = this.bubbles.slice(0, this.params.bubbleCount);
    }
  }

  update() {
    if (!super.update()) return;
    this.clear();
    this.bubbles.forEach((b) => {
      b.update(
        this.width,
        this.height,
        this.windowContext.time.delta * this.params.speed
      );
    });
    this.draw();
  }

  draw() {
    // style
    this.context.strokeStyle = "white";
    this.context.lineWidth = this.params.strokeWeight;

    // draw
    if (this.bubbles) {
      for (let i = 0; i < this.bubbles.length; i++) {
        const current_ = this.bubbles[i];
        for (let j = i; j < this.bubbles.length; j++) {
          const next_ = this.bubbles[j];

          if (
            distance2d(current_.x, current_.y, next_.x, next_.y) <
            this.params.threshold
          ) {
            line(this.context, current_.x, current_.y, next_.x, next_.y);
          }
        }
      }

      this.bubbles.forEach((bubble) => {
        bubble.drawBubble(bubble);
      });
    }
  }

  resize() {
    super.resize();

    if (this.bubbles) {
      this.bubbles.forEach((bubble) => {
        bubble.x =
          bubble.x > this.width ? this.width - bubble.radius : bubble.x;
        bubble.y =
          bubble.y > this.height ? this.height - bubble.radius : bubble.y;
      });
    }
  }
}
