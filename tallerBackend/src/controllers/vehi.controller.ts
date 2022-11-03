import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Vehi} from '../models';
import {VehiRepository} from '../repositories';

export class VehiController {
  constructor(
    @repository(VehiRepository)
    public vehiRepository : VehiRepository,
  ) {}

  @post('/vehis')
  @response(200, {
    description: 'Vehi model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vehi)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehi, {
            title: 'NewVehi',

          }),
        },
      },
    })
    vehi: Vehi,
  ): Promise<Vehi> {
    return this.vehiRepository.create(vehi);
  }

  @get('/vehis/count')
  @response(200, {
    description: 'Vehi model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vehi) where?: Where<Vehi>,
  ): Promise<Count> {
    return this.vehiRepository.count(where);
  }

  @get('/vehis')
  @response(200, {
    description: 'Array of Vehi model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vehi, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vehi) filter?: Filter<Vehi>,
  ): Promise<Vehi[]> {
    return this.vehiRepository.find(filter);
  }

  @patch('/vehis')
  @response(200, {
    description: 'Vehi PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehi, {partial: true}),
        },
      },
    })
    vehi: Vehi,
    @param.where(Vehi) where?: Where<Vehi>,
  ): Promise<Count> {
    return this.vehiRepository.updateAll(vehi, where);
  }

  @get('/vehis/{id}')
  @response(200, {
    description: 'Vehi model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vehi, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vehi, {exclude: 'where'}) filter?: FilterExcludingWhere<Vehi>
  ): Promise<Vehi> {
    id = id.toUpperCase();
    return this.vehiRepository.findById(id, filter);
  }

  @patch('/vehis/{id}')
  @response(204, {
    description: 'Vehi PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehi, {partial: true}),
        },
      },
    })
    vehi: Vehi,
  ): Promise<void> {
    await this.vehiRepository.updateById(id, vehi);
  }

  @put('/vehis/{id}')
  @response(204, {
    description: 'Vehi PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vehi: Vehi,
  ): Promise<void> {
    await this.vehiRepository.replaceById(id, vehi);
  }

  @del('/vehis/{id}')
  @response(204, {
    description: 'Vehi DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vehiRepository.deleteById(id);
  }
}
