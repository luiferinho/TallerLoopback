import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model()
export class Seguro extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Tipo: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaCompra: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaInicial: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaFinal: string;

  @property({
    type: 'number',
    required: true,
  })
  ValorSeguro: number;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  constructor(data?: Partial<Seguro>) {
    super(data);
  }
}

export interface SeguroRelations {
  // describe navigational properties here
}

export type SeguroWithRelations = Seguro & SeguroRelations;
