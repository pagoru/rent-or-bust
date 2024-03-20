import { Engine } from "engine";
import { System } from "system";

export const debug = () => {
  const load = () => {
    // if (
    // 	Utils[Util.ENVIRONMENT][UtilEnvironment.get](Environment.ENVIRONMENT) !==
    // 	'DEVELOPMENT'
    // )
    // 	return;

    //@ts-ignore
    window.__debug__.engine = Engine;
    //@ts-ignore
    window.__debug__.system = System;
  };

  return {
    load,
  };
};
