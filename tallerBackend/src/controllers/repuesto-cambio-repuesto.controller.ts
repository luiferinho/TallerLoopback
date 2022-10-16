import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Repuesto, CambioRepuesto} from '../models';
import {RepuestoRepository} from '../repositories';

export class RepuestoCambioRepuestoController {
  constructor(
    @repository(RepuestoRepository)
    public repuestoRepository: RepuestoRepository,
  ) {}

  @get('/repuestos/{id}/cambio-repuesto', {
    responses: {
      '200': {
        description: 'CambioRepuesto belonging to Repuesto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CambioRepuesto)},
          },
        },
      },
    },
  })
  async getCambioRepuesto(
    @param.path.string('id') id: typeof Repuesto.prototype.id,
  ): Promise<CambioRepuesto> {
    return this.repuestoRepository.cambioRepuesto(id);
  }
}
