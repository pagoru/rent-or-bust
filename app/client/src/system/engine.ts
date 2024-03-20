import { Engine, getSystems } from "engine";
import { OnTickFunction } from "libs/darker-engine";
import { TICKS_PER_SECOND } from "libs/consts";

export const engine = () => {
  let _onTickCallbackList = [];

  const load = async () => {
    Engine.clear();
    Engine.onTick((tickData) => {
      for (const callback of _onTickCallbackList.filter(Boolean))
        callback(tickData);
    });
    await Engine.setSystems(...getSystems());
    await Engine.load({
      ticksPerSecond: TICKS_PER_SECOND,
    });
  };

  const onTick = (callback: OnTickFunction): number =>
    _onTickCallbackList.push(callback) - 1;

  const removeOnTick = (index: number) =>
    (_onTickCallbackList = _onTickCallbackList.map((callback, currentIndex) =>
      currentIndex === index ? null : callback,
    ));

  return {
    load,
    onTick,
    removeOnTick,
  };
};
