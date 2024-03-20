import { BackgroundComponent } from "engine";

export enum Component {
  BACKGROUND,
}

export type ComponentTypeMap = {
  /**************** ENGINE ****************/
  [Component.BACKGROUND]: BackgroundComponent;
};
