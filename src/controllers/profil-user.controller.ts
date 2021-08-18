import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Profil,
  User,
} from '../models';
import {ProfilRepository} from '../repositories';

export class ProfilUserController {
  constructor(
    @repository(ProfilRepository)
    public profilRepository: ProfilRepository,
  ) { }

  @get('/profils/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Profil',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Profil.prototype.id,
  ): Promise<User> {
    return this.profilRepository.user(id);
  }
}
