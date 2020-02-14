import * as PIXI from 'pixi.js';

export function FillCircle(options) {
  const { x, y, radius, fill } = options;
  
  // Build sprit from textures
  var staticCircle = new PIXI.Graphics();
  staticCircle.lineStyle(0);
  staticCircle.beginFill(fill, 1);
  staticCircle.drawCircle(x, y, radius);
  staticCircle.endFill();

  return staticCircle

}
