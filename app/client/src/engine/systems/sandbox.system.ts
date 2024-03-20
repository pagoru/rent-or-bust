import { SystemFunction } from "libs/darker-engine";
import { Component } from "engine";
import { System } from "system";
import { Color, SpriteSheet } from "libs/enums";
import * as PIXI from "libs/pixi.mjs";
import { Utils } from "utils/main";

export const sandboxSystem: SystemFunction<Component> = async () => {
  const onLoad = async () => {
    console.log("HELLO WORLD!");

    const renderSize = System.render.getBounds();
    const backgroundContainer = new PIXI.Container();
    backgroundContainer.pivot.set(renderSize.width / 2, renderSize.height / 2);
    System.render.getStage().addChild(backgroundContainer);

    const BACKGROUND_COLORS = [
      [Color.ALMOST_BLACK, Color.DARK_PURPLE],
      [Color.BLUE_2, Color.ORANGE],
      [Color.BLUE, Color.BLUE_2],
      [Color.BLUE_2, Color.SALMON],
    ];

    const currentBackgroundColors =
      BACKGROUND_COLORS[Utils.date.getHourIndex()];

    const baseBackground = Utils.render.getGraphicsRectangle({
      size: renderSize,
      color: currentBackgroundColors[0],
    });
    backgroundContainer.addChild(baseBackground);

    const backgroundPatternTexture = System.render.textures.getTexture(
      SpriteSheet.SPRITES,
      "background_pattern",
    );
    const patterWidth = backgroundPatternTexture.width;

    for (let i = 0; i < renderSize.width / patterWidth; i++) {
      const sprite = new PIXI.Sprite(backgroundPatternTexture);
      sprite.tint = currentBackgroundColors[1];
      sprite.position.x = i * patterWidth;
      backgroundContainer.addChild(sprite);
    }
  };

  return {
    components: [],
    onLoad,
  };
};
