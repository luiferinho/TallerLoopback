import {
  Entity,
  model,
  property,
  belongsTo,
  hasMany,
} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';
import {Repuesto} from './repuesto.model';

@model()
export class CambioRepuesto extends Entity {
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

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  @hasMany(() => Repuesto)
  repuestos: Repuesto[];

  constructor(data?: Partial<CambioRepuesto>) {
    super(data);
  }
}

export interface CambioRepuestoRelations {
  // describe navigational properties here
}

export type CambioRepuestoWithRelations = CambioRepuesto &
  CambioRepuestoRelations;
