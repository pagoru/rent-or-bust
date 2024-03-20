import * as PIXI from "libs/pixi.mjs";
import { SpriteSheet } from "libs/enums";

export const textures = () => {
  let _spriteSheets: Record<SpriteSheet, PIXI.SpriteSjeet> = {} as any;

  const load = async () => {
    for (const spriteSheetName of Object.values(SpriteSheet)) {
      const texture = await PIXI.Assets.load(`./assets/${spriteSheetName}.png`);
      const sheet = await (
        await fetch(`./assets/${spriteSheetName}.json`)
      ).json();
      _spriteSheets[spriteSheetName] = new PIXI.Spritesheet(texture, sheet);
      await _spriteSheets[spriteSheetName].parse();
    }
  };

  const getTexture = (
    spriteSheet: SpriteSheet,
    texture: string,
  ): PIXI.Texture => _spriteSheets[spriteSheet].textures[texture];

  return {
    load,
    getTexture,
    // getAnimation
  };
};
