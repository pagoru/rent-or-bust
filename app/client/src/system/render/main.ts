import * as PIXI from "libs/pixi.mjs";
import { textures } from "./textures";
import { Size2d } from "libs/types";
import { Color } from "libs/enums";
import { queue } from "system/render/queue";

export const render = () => {
  const app = new PIXI.Application();

  const SCALE = 3;
  const WINDOW_SIZE: Size2d = {
    width: 320,
    height: 180,
  };

  const _textures = textures();
  const _queue = queue();

  const load = async () => {
    await app.init({
      width: WINDOW_SIZE.width,
      height: WINDOW_SIZE.height,
      backgroundColor: Color.WHITE,
      antialias: true,
      sharedTicker: true,
    });
    app.stage.sortableChildren = true;
    app.stage.eventMode = "static";

    // Renders crisp pixel sprites
    PIXI.TextureSource.defaultOptions.scaleMode = "nearest";
    // PIXI.settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = true;
    PIXI.AbstractRenderer.defaultOptions.failIfMajorPerformanceCaveat = true;

    _queue.load();

    document.body.appendChild(app.canvas);

    // adjusting scale resolution
    {
      app.renderer.resolution = SCALE * Math.round(devicePixelRatio);

      app.renderer.resize(WINDOW_SIZE.width, WINDOW_SIZE.height);

      app.canvas.style.width = `${Math.round(WINDOW_SIZE.width * SCALE)}px`;
      app.canvas.style.height = `${Math.round(WINDOW_SIZE.height * SCALE)}px`;

      app.stage.position.set(
        Math.round(WINDOW_SIZE.width / 2),
        Math.round(WINDOW_SIZE.height / 2),
      );
    }

    await _textures.load();
  };

  const getStage = () => app.stage;
  const getBounds = (): Size2d => WINDOW_SIZE;

  return {
    load,
    getStage,
    getBounds,
    //-----
    textures: _textures,
    queue: _queue,
  };
};
