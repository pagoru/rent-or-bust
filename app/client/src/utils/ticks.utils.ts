import { TICKS_PER_SECOND } from "libs/consts";
import { System } from "system";
import { Utils } from "utils/main";

export const ticksUtils = () => {
  const getTicksFromMilliseconds = (millis: number): number =>
    Math.round((TICKS_PER_SECOND / 1_000) * millis);

  const waitUntil = (millis: number): Promise<void> =>
    new Promise((resolve) => {
      const tickEventId = System.engine.onTick(({ tickCount }) => {
        if (tickCount > Utils.ticks.getTicksFromMilliseconds(millis)) {
          System.engine.removeOnTick(tickEventId);
          resolve();
        }
      });
    });

  return {
    getTicksFromMilliseconds,
    waitUntil,
  };
};
