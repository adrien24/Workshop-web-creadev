import { deg2rad } from "../Utils/MathUtils";

export function circle(context, x, y, radius, ...args) {
  //   STYLE
  let isStroke = true;
  let isFill = false;

  if (args.length > 0) {
    const style = args[0];

    isStroke = style.isStroke || false;
    isFill = style.isFill || false;
  }

  context.beginPath();
  context.arc(x, y, radius, 0, deg2rad(360));
  if (isFill) context.fill();
  if (isStroke) context.stroke();
  context.closePath();
}

export function line(context, x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}
