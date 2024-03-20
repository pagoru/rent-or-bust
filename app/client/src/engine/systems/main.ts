import { SystemFunction } from "libs/darker-engine";
import { Component } from "engine/components";
import { sandboxSystem } from "./sandbox.system";
import { miscSystemList } from "engine/systems/misc";

export const getSystems = (): SystemFunction<Component>[] => [
  ...miscSystemList,
  sandboxSystem,
];
