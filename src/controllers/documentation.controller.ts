import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Documentation} from '../models';
import {DocumentationRepository} from '../repositories';

export class DocumentationController {
  constructor(
    @repository(DocumentationRepository)
    public documentationRepository : DocumentationRepository,
  ) {}

  @post('/documentations')
  @response(200, {
    description: 'Documentation model instance',
    content: {'application/json': {schema: getModelSchemaRef(Documentation)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Documentation, {
            title: 'NewDocumentation',
            exclude: ['id'],
          }),
        },
      },
    })
    documentation: Omit<Documentation, 'id'>,
  ): Promise<Documentation> {
    return this.documentationRepository.create(documentation);
  }

  @get('/documentations/count')
  @response(200, {
    description: 'Documentation model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Documentation) where?: Where<Documentation>,
  ): Promise<Count> {
    return this.documentationRepository.count(where);
  }

  @get('/documentations')
  @response(200, {
    description: 'Array of Documentation model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Documentation, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Documentation) filter?: Filter<Documentation>,
  ): Promise<Documentation[]> {
    return this.documentationRepository.find(filter);
  }

  @patch('/documentations')
  @response(200, {
    description: 'Documentation PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Documentation, {partial: true}),
        },
      },
    })
    documentation: Documentation,
    @param.where(Documentation) where?: Where<Documentation>,
  ): Promise<Count> {
    return this.documentationRepository.updateAll(documentation, where);
  }

  @get('/documentations/{id}')
  @response(200, {
    description: 'Documentation model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Documentation, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Documentation, {exclude: 'where'}) filter?: FilterExcludingWhere<Documentation>
  ): Promise<Documentation> {
    return this.documentationRepository.findById(id, filter);
  }

  @patch('/documentations/{id}')
  @response(204, {
    description: 'Documentation PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Documentation, {partial: true}),
        },
      },
    })
    documentation: Documentation,
  ): Promise<void> {
    await this.documentationRepository.updateById(id, documentation);
  }

  @put('/documentations/{id}')
  @response(204, {
    description: 'Documentation PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() documentation: Documentation,
  ): Promise<void> {
    await this.documentationRepository.replaceById(id, documentation);
  }

  @del('/documentations/{id}')
  @response(204, {
    description: 'Documentation DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.documentationRepository.deleteById(id);
  }
}
