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
import {
  Propietario,
  Vehi,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioVehiController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/vehi', {
    responses: {
      '200': {
        description: 'Propietario has one Vehi',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vehi),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehi>,
  ): Promise<Vehi> {
    return this.propietarioRepository.vehi(id).get(filter);
  }

  @post('/propietarios/{id}/vehi', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehi)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehi, {
            title: 'NewVehiInPropietario',
            exclude: ['Placa'],
            optional: ['propietarioId']
          }),
        },
      },
    }) vehi: Omit<Vehi, 'Placa'>,
  ): Promise<Vehi> {
    return this.propietarioRepository.vehi(id).create(vehi);
  }

  @patch('/propietarios/{id}/vehi', {
    responses: {
      '200': {
        description: 'Propietario.Vehi PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehi, {partial: true}),
        },
      },
    })
    vehi: Partial<Vehi>,
    @param.query.object('where', getWhereSchemaFor(Vehi)) where?: Where<Vehi>,
  ): Promise<Count> {
    return this.propietarioRepository.vehi(id).patch(vehi, where);
  }

  @del('/propietarios/{id}/vehi', {
    responses: {
      '200': {
        description: 'Propietario.Vehi DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehi)) where?: Where<Vehi>,
  ): Promise<Count> {
    return this.propietarioRepository.vehi(id).delete(where);
  }
}
