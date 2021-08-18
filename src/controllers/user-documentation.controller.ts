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
  User,
  Documentation,
} from '../models';
import {UserRepository} from '../repositories';

export class UserDocumentationController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/documentations', {
    responses: {
      '200': {
        description: 'Array of User has many Documentation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Documentation)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Documentation>,
  ): Promise<Documentation[]> {
    return this.userRepository.documentations(id).find(filter);
  }

  @post('/users/{id}/documentations', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Documentation)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Documentation, {
            title: 'NewDocumentationInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) documentation: Omit<Documentation, 'id'>,
  ): Promise<Documentation> {
    return this.userRepository.documentations(id).create(documentation);
  }

  @patch('/users/{id}/documentations', {
    responses: {
      '200': {
        description: 'User.Documentation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Documentation, {partial: true}),
        },
      },
    })
    documentation: Partial<Documentation>,
    @param.query.object('where', getWhereSchemaFor(Documentation)) where?: Where<Documentation>,
  ): Promise<Count> {
    return this.userRepository.documentations(id).patch(documentation, where);
  }

  @del('/users/{id}/documentations', {
    responses: {
      '200': {
        description: 'User.Documentation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Documentation)) where?: Where<Documentation>,
  ): Promise<Count> {
    return this.userRepository.documentations(id).delete(where);
  }
}
