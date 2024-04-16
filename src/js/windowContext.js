import Time from "./Utils/Time";
import Debug from "./Utils/Debug";

let instanceWindowContext = null;

export default class WindowContext {
  constructor() {
    if (!!instanceWindowContext) return instanceWindowContext;
    instanceWindowContext = this;

    this.scenes = [];
    window.addEventListener("resize", () => this.resize());
    window.addEventListener("scroll", () => this.scroll());
    this.time = new Time();
    this.time.on("update", () => this.update());

    // debug
    this.debug = new Debug();
  }

  addScene(scene) {
    this.scenes.push(scene);
  }

  update() {
    this.scenes.forEach((s) => {
      if (s.isVisible) s.update();
    });
  }

  resize() {
    this.scenes.forEach((s) => s.resize());
  }

  scroll() {
    this.scenes.forEach((s) => s.scroll());
  }

  destroy() {
    this.scenes.forEach((s) => s.destroy());
    window.removeEventListener("resize", () => this.resize());
    window.removeEventListener("scroll", () => this.scroll());
    this.time.off("update");
    if (this.debug.active) this.debug.ui.destroy();
  }

  get size() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
    };
  }
}
