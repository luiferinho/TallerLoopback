import {
  Entity,
  model,
  property,
  belongsTo,
  hasMany,
} from '@loopback/repository';
import {Propietario} from './propietario.model';
import {Mecanico} from './mecanico.model';
import {RevisionNiveles} from './revision-niveles.model';
import {CambioRepuesto} from './cambio-repuesto.model';
import {Seguro} from './seguro.model';

@model()
export class Vehiculo extends Entity {
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
  Placa: string;

  @property({
    type: 'string',
    required: true,
  })
  Tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  Marca: string;

  @property({
    type: 'date',
    required: true,
  })
  Modelo: string;

  @property({
    type: 'number',
    required: true,
  })
  Pasajeros: number;

  @property({
    type: 'number',
    required: true,
  })
  Cilindraje: number;

  @property({
    type: 'string',
    required: true,
  })
  PaisOrigen: string;

  @property({
    type: 'string',
    required: true,
  })
  Caracteristicas: string;

  @belongsTo(() => Propietario)
  propietarioId: string;

  @belongsTo(() => Mecanico)
  mecanicoId: string;

  @hasMany(() => RevisionNiveles)
  revisionNiveles: RevisionNiveles[];

  @hasMany(() => CambioRepuesto)
  cambioRepuestos: CambioRepuesto[];

  @hasMany(() => Seguro)
  seguros: Seguro[];

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
