import { EntityTypeFunction } from 'libs/darker-engine';
import { Component, ComponentTypeMap, Entity } from 'engine';

type Props = {};

export const _Entity: EntityTypeFunction<
	Entity,
	Component,
	ComponentTypeMap,
	Props
> = () => ({
	type: Entity.OBJECT,
	data: {},
	components: [],
});
