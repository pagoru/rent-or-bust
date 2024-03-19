import * as PIXI from 'libs/pixi.mjs';
import {textures} from "system/render/textures";

export const render = () => {
	const app = new PIXI.Application();
	
	const _textures = textures();
	const load = async () => {
		await app.init({
			width: 960,
			height: 540,
			backgroundColor: 0xff00ff,
			antialias: true,
			sharedTicker: true,
		})
		app.stage.sortableChildren = true;
		app.stage.eventMode = 'static';
		
		// Renders crisp pixel sprites
		PIXI.TextureSource.defaultOptions.scaleMode = 'nearest';
		// PIXI.settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = true;
		PIXI.AbstractRenderer.defaultOptions.failIfMajorPerformanceCaveat = true;
		
		
		document.body.appendChild(app.canvas);
		
		await _textures.load();
	}
	
	return {
		load,
		textures: _textures
	}
	
}