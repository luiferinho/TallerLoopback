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
import {Mecanico, Vehiculo} from '../models';
import {MecanicoRepository} from '../repositories';

export class MecanicoVehiculoController {
  constructor(
    @repository(MecanicoRepository)
    protected mecanicoRepository: MecanicoRepository,
  ) {}

  @get('/mecanicos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Mecanico has many Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.mecanicoRepository.vehiculos(id).find(filter);
  }

  @post('/mecanicos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Mecanico model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mecanico.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInMecanico',
            exclude: ['id'],
            optional: ['mecanicoId'],
          }),
        },
      },
    })
    vehiculo: Omit<Vehiculo, 'id'>,
  ): Promise<Vehiculo> {
    return this.mecanicoRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/mecanicos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Mecanico.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo))
    where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.mecanicoRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/mecanicos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Mecanico.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo))
    where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.mecanicoRepository.vehiculos(id).delete(where);
  }
}
