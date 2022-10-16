import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Vehiculo, Mecanico} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoMecanicoController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) {}

  @get('/vehiculos/{id}/mecanico', {
    responses: {
      '200': {
        description: 'Mecanico belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mecanico)},
          },
        },
      },
    },
  })
  async getMecanico(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
  ): Promise<Mecanico> {
    return this.vehiculoRepository.mecanico(id);
  }
}
