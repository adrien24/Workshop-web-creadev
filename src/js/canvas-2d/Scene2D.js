import DomElement from "../Utils/window/DomElement.js";
import WindowContext from "../windowContext.js";

export default class Scene2D {
  constructor(id = "canvas-scene") {
    this.windowContext = new WindowContext();
    this.windowContext.addScene(this);

    // debug
    this.params = {
      isUpdate: true,
    };
    this.debug = this.windowContext.debug;
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder(id);
      this.debugFolder.add(this.params, "isUpdate").name("Play / Pause");
    }

    // canvas + context 2d
    this.domElement = new DomElement(id);
    this.canvas = this.domElement.element;
    this.context = this.canvas.getContext("2d");

    this.resize();
  }

  get width() {
    return this.domElement.width;
  }
  get height() {
    return this.domElement.height;
  }
  get position() {
    return this.domElement.position;
  }

  get isVisible() {
    return this.domElement.isVisible;
  }

  update() {
    return this.params.isUpdate;
  }

  scroll() {
    this.domElement.setSize();
  }

  destroy(){
    
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  resize() {
    this.domElement.setSize();
    const piexelRatio = this.windowContext.size.pixelRatio;
    this.canvas.width = this.domElement.width * piexelRatio;
    this.canvas.height = this.domElement.height * piexelRatio;
    this.context.scale(piexelRatio, piexelRatio);
  }
}
