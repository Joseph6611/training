import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Documentation,
  User,
} from '../models';
import {DocumentationRepository} from '../repositories';

export class DocumentationUserController {
  constructor(
    @repository(DocumentationRepository)
    public documentationRepository: DocumentationRepository,
  ) { }

  @get('/documentations/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Documentation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Documentation.prototype.id,
  ): Promise<User> {
    return this.documentationRepository.user(id);
  }
}
