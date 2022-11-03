import {Entity, model, property, hasOne} from '@loopback/repository';
import {Vehi} from './vehi.model';

@model()
export class Propietario extends Entity {
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
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  NumeroTelefono: string;

  @property({
    type: 'date',
    default: 1950,
  })
  FechaNacimiento?: string;

  @property({
    type: 'string',
    required: true,
  })
  CiudadResidencia: string;

  @property({
    type: 'string',
    required: true,
  })
  Correo: string;

  @hasOne(() => Vehi)
  vehi: Vehi;

  constructor(data?: Partial<Propietario>) {
    super(data);
  }
}

export interface PropietarioRelations {
  // describe navigational properties here
}

export type PropietarioWithRelations = Propietario & PropietarioRelations;
