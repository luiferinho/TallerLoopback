import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Vehiculo, RevisionNiveles} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoRevisionNivelesController {
  constructor(
    @repository(VehiculoRepository)
    protected vehiculoRepository: VehiculoRepository,
  ) {}

  @get('/vehiculos/{id}/revision-niveles', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many RevisionNiveles',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RevisionNiveles)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<RevisionNiveles>,
  ): Promise<RevisionNiveles[]> {
    return this.vehiculoRepository.revisionNiveles(id).find(filter);
  }

  @post('/vehiculos/{id}/revision-niveles', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(RevisionNiveles)},
        },
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RevisionNiveles, {
            title: 'NewRevisionNivelesInVehiculo',
            exclude: ['id'],
            optional: ['vehiculoId'],
          }),
        },
      },
    })
    revisionNiveles: Omit<RevisionNiveles, 'id'>,
  ): Promise<RevisionNiveles> {
    return this.vehiculoRepository.revisionNiveles(id).create(revisionNiveles);
  }

  @patch('/vehiculos/{id}/revision-niveles', {
    responses: {
      '200': {
        description: 'Vehiculo.RevisionNiveles PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RevisionNiveles, {partial: true}),
        },
      },
    })
    revisionNiveles: Partial<RevisionNiveles>,
    @param.query.object('where', getWhereSchemaFor(RevisionNiveles))
    where?: Where<RevisionNiveles>,
  ): Promise<Count> {
    return this.vehiculoRepository
      .revisionNiveles(id)
      .patch(revisionNiveles, where);
  }

  @del('/vehiculos/{id}/revision-niveles', {
    responses: {
      '200': {
        description: 'Vehiculo.RevisionNiveles DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(RevisionNiveles))
    where?: Where<RevisionNiveles>,
  ): Promise<Count> {
    return this.vehiculoRepository.revisionNiveles(id).delete(where);
  }
}
