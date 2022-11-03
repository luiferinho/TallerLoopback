import {Entity, model, property} from '@loopback/repository';

@model()
export class Vehi extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
    jsonSchema: {
      maxLength: 6,
      minLength: 6,
      errorMessage: 'La placa debe tener 6 caracteres',
      transform: ['toUpperCase'],
    },
  })
  Placa: string;
  @property({
    type: 'string',
    required: true,
  })
  Marca: string;

  @property({
    type: 'string',
    required: true,
  })
  Tipo: string;



  @property({
    type: 'number',
    required: true,
  })
  Modelo: number;

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
    jsonSchema: {
      maxLength: 10,
      minLength: 5,
      errorMessage: 'City name should be between 5 and 20 characters',
      transform: ['toUpperCase'],
    },
  })
  Caracteristicas: string;

  @property({
    type: 'string',
  })
  propietarioId?: string;

  constructor(data?: Partial<Vehi>) {
    super(data);
  }
}

export interface VehiRelations {
  // describe navigational properties here
}

export type VehiWithRelations = Vehi & VehiRelations;
