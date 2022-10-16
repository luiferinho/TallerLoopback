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
import {CambioRepuesto, Repuesto} from '../models';
import {CambioRepuestoRepository} from '../repositories';

export class CambioRepuestoRepuestoController {
  constructor(
    @repository(CambioRepuestoRepository)
    protected cambioRepuestoRepository: CambioRepuestoRepository,
  ) {}

  @get('/cambio-repuestos/{id}/repuestos', {
    responses: {
      '200': {
        description: 'Array of CambioRepuesto has many Repuesto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Repuesto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Repuesto>,
  ): Promise<Repuesto[]> {
    return this.cambioRepuestoRepository.repuestos(id).find(filter);
  }

  @post('/cambio-repuestos/{id}/repuestos', {
    responses: {
      '200': {
        description: 'CambioRepuesto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Repuesto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CambioRepuesto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repuesto, {
            title: 'NewRepuestoInCambioRepuesto',
            exclude: ['id'],
            optional: ['cambioRepuestoId'],
          }),
        },
      },
    })
    repuesto: Omit<Repuesto, 'id'>,
  ): Promise<Repuesto> {
    return this.cambioRepuestoRepository.repuestos(id).create(repuesto);
  }

  @patch('/cambio-repuestos/{id}/repuestos', {
    responses: {
      '200': {
        description: 'CambioRepuesto.Repuesto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repuesto, {partial: true}),
        },
      },
    })
    repuesto: Partial<Repuesto>,
    @param.query.object('where', getWhereSchemaFor(Repuesto))
    where?: Where<Repuesto>,
  ): Promise<Count> {
    return this.cambioRepuestoRepository.repuestos(id).patch(repuesto, where);
  }

  @del('/cambio-repuestos/{id}/repuestos', {
    responses: {
      '200': {
        description: 'CambioRepuesto.Repuesto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Repuesto))
    where?: Where<Repuesto>,
  ): Promise<Count> {
    return this.cambioRepuestoRepository.repuestos(id).delete(where);
  }
}
