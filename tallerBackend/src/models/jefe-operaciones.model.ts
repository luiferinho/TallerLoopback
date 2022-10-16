import {Entity, model, property} from '@loopback/repository';

@model()
export class JefeOperaciones extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  constructor(data?: Partial<JefeOperaciones>) {
    super(data);
  }
}

export interface JefeOperacionesRelations {
  // describe navigational properties here
}

export type JefeOperacionesWithRelations = JefeOperaciones &
  JefeOperacionesRelations;
