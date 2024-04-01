import { SystemFunction } from "libs/darker-engine";
import { Component } from "engine";
import { System } from "system";
import * as PIXI from "libs/pixi.mjs";
import { Utils } from "utils/main";
import { Color, SpriteSheet, TickerQueue } from "libs/enums";

export const splashSystem: SystemFunction<Component> = async () => {
  const onLoad = async () => {
    const renderSize = System.render.getBounds();
    const container = new PIXI.Container();
    container.zIndex = Number.MAX_VALUE;
    System.render.getStage().addChild(container);

    const baseBackground = Utils.render.getGraphicsRectangle({
      size: renderSize,
      color: Color.WHITE,
    });
    baseBackground.pivot.set(renderSize.width / 2, renderSize.height / 2);
    container.addChild(baseBackground);

    const withLoveTexture = System.render.textures.getTexture(
      SpriteSheet.SPRITES,
      "with_love",
    );
    const withLoveSprite = new PIXI.Sprite(withLoveTexture);
    withLoveSprite.alpha = 0;
    withLoveSprite.pivot.set(
      withLoveTexture.width / 2,
      withLoveTexture.height / 2,
    );
    container.addChild(withLoveSprite);

    if (true) {
      container.destroy();
      return;
    }

    let repeat = 0;
    System.render.queue.addList(
      [
        {
          type: TickerQueue.REPEAT,
          repeats: 60,
          repeatEvery: 10,
          onFunc: () => {
            withLoveSprite.alpha = repeat * (1 / 60);
            repeat++;
          },
          onDone: () => {
            repeat = 0;
          },
        },
        {
          type: TickerQueue.DELAY,
          delay: 3_000,
        },
        {
          type: TickerQueue.REPEAT,
          repeats: 60,
          repeatEvery: 10,
          onFunc: () => {
            withLoveSprite.alpha = 1 - repeat * (1 / 60);
            repeat++;
          },
        },
        {
          type: TickerQueue.DELAY,
          delay: 1_000,
        },
      ],
      () => {
        container.destroy();
      },
    );

    // Utils.ticks.waitUntil(EVERY_MS * (REPEATS + 1)).then(() => {
    //   container.destroy();
    // });
  };

  return {
    components: [],
    onLoad,
  };
};
