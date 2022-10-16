import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {RevisionNiveles, Vehiculo} from '../models';
import {RevisionNivelesRepository} from '../repositories';

export class RevisionNivelesVehiculoController {
  constructor(
    @repository(RevisionNivelesRepository)
    public revisionNivelesRepository: RevisionNivelesRepository,
  ) {}

  @get('/revision-niveles/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to RevisionNiveles',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof RevisionNiveles.prototype.id,
  ): Promise<Vehiculo> {
    return this.revisionNivelesRepository.vehiculo(id);
  }
}
