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
import {Vehiculo, CambioRepuesto} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoCambioRepuestoController {
  constructor(
    @repository(VehiculoRepository)
    protected vehiculoRepository: VehiculoRepository,
  ) {}

  @get('/vehiculos/{id}/cambio-repuestos', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many CambioRepuesto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CambioRepuesto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CambioRepuesto>,
  ): Promise<CambioRepuesto[]> {
    return this.vehiculoRepository.cambioRepuestos(id).find(filter);
  }

  @post('/vehiculos/{id}/cambio-repuestos', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(CambioRepuesto)},
        },
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CambioRepuesto, {
            title: 'NewCambioRepuestoInVehiculo',
            exclude: ['id'],
            optional: ['vehiculoId'],
          }),
        },
      },
    })
    cambioRepuesto: Omit<CambioRepuesto, 'id'>,
  ): Promise<CambioRepuesto> {
    return this.vehiculoRepository.cambioRepuestos(id).create(cambioRepuesto);
  }

  @patch('/vehiculos/{id}/cambio-repuestos', {
    responses: {
      '200': {
        description: 'Vehiculo.CambioRepuesto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CambioRepuesto, {partial: true}),
        },
      },
    })
    cambioRepuesto: Partial<CambioRepuesto>,
    @param.query.object('where', getWhereSchemaFor(CambioRepuesto))
    where?: Where<CambioRepuesto>,
  ): Promise<Count> {
    return this.vehiculoRepository
      .cambioRepuestos(id)
      .patch(cambioRepuesto, where);
  }

  @del('/vehiculos/{id}/cambio-repuestos', {
    responses: {
      '200': {
        description: 'Vehiculo.CambioRepuesto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CambioRepuesto))
    where?: Where<CambioRepuesto>,
  ): Promise<Count> {
    return this.vehiculoRepository.cambioRepuestos(id).delete(where);
  }
}
