import {Engine} from "engine/main";
import {render} from "system/render";

export const System = (() => {
	
	const _render = render();
	const load = async () => {
	
		document.title = 'Rent Or Bust'
		
		await _render.load();
		
		Engine.clear();
		await Engine.load();
	}
	
	return {
		load
	}
})();