import { renderUtils } from "utils/render.utils";
import { dateUtils } from "utils/date.utils";
import { ticksUtils } from "utils/ticks.utils";

export const Utils = (() => {
  return {
    render: renderUtils(),
    date: dateUtils(),
    ticks: ticksUtils(),
  };
})();
