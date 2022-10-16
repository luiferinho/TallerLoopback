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
import {Vehiculo, Seguro} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoSeguroController {
  constructor(
    @repository(VehiculoRepository)
    protected vehiculoRepository: VehiculoRepository,
  ) {}

  @get('/vehiculos/{id}/seguros', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many Seguro',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Seguro)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Seguro>,
  ): Promise<Seguro[]> {
    return this.vehiculoRepository.seguros(id).find(filter);
  }

  @post('/vehiculos/{id}/seguros', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Seguro)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seguro, {
            title: 'NewSeguroInVehiculo',
            exclude: ['id'],
            optional: ['vehiculoId'],
          }),
        },
      },
    })
    seguro: Omit<Seguro, 'id'>,
  ): Promise<Seguro> {
    return this.vehiculoRepository.seguros(id).create(seguro);
  }

  @patch('/vehiculos/{id}/seguros', {
    responses: {
      '200': {
        description: 'Vehiculo.Seguro PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seguro, {partial: true}),
        },
      },
    })
    seguro: Partial<Seguro>,
    @param.query.object('where', getWhereSchemaFor(Seguro))
    where?: Where<Seguro>,
  ): Promise<Count> {
    return this.vehiculoRepository.seguros(id).patch(seguro, where);
  }

  @del('/vehiculos/{id}/seguros', {
    responses: {
      '200': {
        description: 'Vehiculo.Seguro DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Seguro))
    where?: Where<Seguro>,
  ): Promise<Count> {
    return this.vehiculoRepository.seguros(id).delete(where);
  }
}
