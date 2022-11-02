import {Entity, hasMany, model, property} from '@loopback/repository';
import {Persona} from './persona.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Mecanico extends Entity implements Persona {
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
  Direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  NivelEstudio: string;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellido: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  Telefono: string;

  constructor(data?: Partial<Mecanico>) {
    super(data);
  }
}

export interface MecanicoRelations {
  // describe navigational properties here
}

export type MecanicoWithRelations = Mecanico & MecanicoRelations;
