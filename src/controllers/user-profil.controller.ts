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
  Profil,
} from '../models';
import {UserRepository} from '../repositories';

export class UserProfilController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/profil', {
    responses: {
      '200': {
        description: 'User has one Profil',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Profil),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Profil>,
  ): Promise<Profil> {
    return this.userRepository.profil(id).get(filter);
  }

  @post('/users/{id}/profil', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Profil)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profil, {
            title: 'NewProfilInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) profil: Omit<Profil, 'id'>,
  ): Promise<Profil> {
    return this.userRepository.profil(id).create(profil);
  }

  @patch('/users/{id}/profil', {
    responses: {
      '200': {
        description: 'User.Profil PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profil, {partial: true}),
        },
      },
    })
    profil: Partial<Profil>,
    @param.query.object('where', getWhereSchemaFor(Profil)) where?: Where<Profil>,
  ): Promise<Count> {
    return this.userRepository.profil(id).patch(profil, where);
  }

  @del('/users/{id}/profil', {
    responses: {
      '200': {
        description: 'User.Profil DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Profil)) where?: Where<Profil>,
  ): Promise<Count> {
    return this.userRepository.profil(id).delete(where);
  }
}
