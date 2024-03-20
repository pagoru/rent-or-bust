import {
  Graphics,
  GraphicsPolygon,
  GraphicsRectanglePolygon,
} from "libs/types";
import * as PIXI from "libs/pixi.mjs";

export const renderUtils = () => {
  const getGraphicsPolygon = ({
    graphics = new PIXI.Graphics(),
    polygon,
    color = 0xffffff,
  }: Graphics & GraphicsPolygon): PIXI.Graphics => {
    graphics.clear();
    graphics.poly(polygon).fill({ color });
    return graphics;
  };

  const getGraphicsRectangle = ({
    graphics = new PIXI.Graphics(),
    color = 0xffffff,
    size,
  }: Graphics & GraphicsRectanglePolygon): PIXI.Graphics => {
    return getGraphicsPolygon({
      graphics,
      color,
      polygon: [0, 0, size.width, 0, size.width, size.height, 0, size.height],
    });
  };

  return {
    getGraphicsPolygon,
    getGraphicsRectangle,
  };
};
