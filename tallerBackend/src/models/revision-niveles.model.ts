import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model()
export class RevisionNiveles extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaHora: string;

  @property({
    type: 'number',
    required: true,
  })
  NivelAceite: number;

  @property({
    type: 'number',
    required: true,
  })
  NivelLiquidoFrenos: number;

  @property({
    type: 'number',
    required: true,
  })
  NivelRefrigerante: number;

  @property({
    type: 'number',
    required: true,
  })
  NivelLiquidoDireccion: number;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  constructor(data?: Partial<RevisionNiveles>) {
    super(data);
  }
}

export interface RevisionNivelesRelations {
  // describe navigational properties here
}

export type RevisionNivelesWithRelations = RevisionNiveles &
  RevisionNivelesRelations;
