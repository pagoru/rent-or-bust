import * as PIXI from 'libs/pixi.mjs';
import { Vector2d } from 'libs/types/vector.types';
import { Size2d } from 'libs/types/size.types';

export type Graphics = {
	graphics?: PIXI.Graphics;
	color: number;
};

export type GraphicsLine = {
	width: number;
	position: Vector2d;
	points: Vector2d[];
	dashGap?: number;
};

export type GraphicsPolygon = {
	polygon: number[];
};

export type GraphicsLinePolygon = {
	width?: number;
	points?: Vector2d[];
	dashGap?: number;
};

export type GraphicsRectanglePolygon = {
	size: Size2d;
};

export type GraphicsLineRectanglePolygon = {
	width?: number;
	position: Vector2d;
	size: Size2d;
	dashGap?: number;
	multiplier?: number;
} & GraphicsRectanglePolygon;
