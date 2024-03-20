import { render } from "system/render";
import { debug } from "system/debug";
import { engine } from "system/engine";

export const System = (() => {
  const _render = render();
  const _debug = debug();
  const _engine = engine();

  const load = async () => {
    document.title = "Rent Or Bust";

    await _render.load();

    _debug.load();
    await _engine.load();
  };

  return {
    load,
    render: _render,
    engine: _engine,
  };
})();
