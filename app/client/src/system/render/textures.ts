import * as PIXI from 'libs/pixi.mjs';

export const textures = () => {
	
	let _spriteSheet: PIXI.SpriteSjeet;
	
	const load = async () => {
		const texture = await PIXI.Assets.load('./assets/sprites.png');
		const sheet = await PIXI.Assets.load('./assets/sprites.json');
		// _spriteSheet = new PIXI.Spritesheet(texture, sheet);
		// await _spriteSheet.parse();
	}
	
	return {
		load,
		// getTexture,
		// getAnimation
	}
	
}