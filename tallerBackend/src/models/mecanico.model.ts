import {Entity, model, property} from '@loopback/repository';

@model()
export class Mecanico extends Entity   {
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

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 10,
      minLength: 3,
      errorMessage: 'El nombre debe tener un máximo de 10 caracteres',
      pattern: "^[A-Za-z\\s]*$"

    },
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 10,
      minLength: 3,
      errorMessage: 'El apellido debe tener un máximo de 10 caracteres',
      pattern: "^[A-Za-z\\s]*$"

    },
  })
  Apellidos: string;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      maxLength: 10,
      minLength: 10,
      errorMessage: 'El telefono debe teenr 10 digitos',
      pattern: "[0-9]"

    },
  })
  NumeroTelefono: number;

  @property({
    type: 'date',
    default: 1950,
    jsonSchema: {
      format: 'date'
     },
  })
  FechaNacimiento?: string;



  @property({
    type: 'string',
    required: true,
    jsonSchema: {
     format: 'email'
    },
  })
  Correo: string;


  constructor(data?: Partial<Mecanico>) {
    super(data);
  }
}

export interface MecanicoRelations {
  // describe navigational properties here
}

export type MecanicoWithRelations = Mecanico & MecanicoRelations;
