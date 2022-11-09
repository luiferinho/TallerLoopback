import {Model, model, property} from '@loopback/repository';

@model()
export class Credenciles extends Model {
  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;


  constructor(data?: Partial<Credenciles>) {
    super(data);
  }
}

export interface CredencilesRelations {
  // describe navigational properties here
}

export type CredencilesWithRelations = Credenciles & CredencilesRelations;
