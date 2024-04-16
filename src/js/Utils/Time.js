import EventEmitter from "./events/EventEmitter";

export default class Time extends EventEmitter {
  constructor() {
    super();

    this.start = Date.now();
    this.current = this.start; // Date now
    this.elapsed = 0; // temps écoulé depuis l'instance de la classe
    this.delta = 16; // temps écoulé entre deux frames

    this.update();
  }

  update() {
    const current_ = Date.now();
    this.delta = current_ - this.current;
    this.current = current_;
    this.elapsed = this.current - this.start;

    this.trigger("update");

    window.requestAnimationFrame(() => {
      this.update();
    });
  }
}
