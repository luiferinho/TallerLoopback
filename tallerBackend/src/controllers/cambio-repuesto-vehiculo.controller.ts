import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {CambioRepuesto, Vehiculo} from '../models';
import {CambioRepuestoRepository} from '../repositories';

export class CambioRepuestoVehiculoController {
  constructor(
    @repository(CambioRepuestoRepository)
    public cambioRepuestoRepository: CambioRepuestoRepository,
  ) {}

  @get('/cambio-repuestos/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to CambioRepuesto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof CambioRepuesto.prototype.id,
  ): Promise<Vehiculo> {
    return this.cambioRepuestoRepository.vehiculo(id);
  }
}
