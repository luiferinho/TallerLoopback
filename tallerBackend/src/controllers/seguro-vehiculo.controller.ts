import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Seguro, Vehiculo} from '../models';
import {SeguroRepository} from '../repositories';

export class SeguroVehiculoController {
  constructor(
    @repository(SeguroRepository)
    public seguroRepository: SeguroRepository,
  ) {}

  @get('/seguros/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Seguro',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof Seguro.prototype.id,
  ): Promise<Vehiculo> {
    return this.seguroRepository.vehiculo(id);
  }
}
