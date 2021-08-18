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
  Wallet,
} from '../models';
import {UserRepository} from '../repositories';

export class UserWalletController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/wallet', {
    responses: {
      '200': {
        description: 'User has one Wallet',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Wallet),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Wallet>,
  ): Promise<Wallet> {
    return this.userRepository.wallet(id).get(filter);
  }

  @post('/users/{id}/wallet', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Wallet)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wallet, {
            title: 'NewWalletInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) wallet: Omit<Wallet, 'id'>,
  ): Promise<Wallet> {
    return this.userRepository.wallet(id).create(wallet);
  }

  @patch('/users/{id}/wallet', {
    responses: {
      '200': {
        description: 'User.Wallet PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wallet, {partial: true}),
        },
      },
    })
    wallet: Partial<Wallet>,
    @param.query.object('where', getWhereSchemaFor(Wallet)) where?: Where<Wallet>,
  ): Promise<Count> {
    return this.userRepository.wallet(id).patch(wallet, where);
  }

  @del('/users/{id}/wallet', {
    responses: {
      '200': {
        description: 'User.Wallet DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Wallet)) where?: Where<Wallet>,
  ): Promise<Count> {
    return this.userRepository.wallet(id).delete(where);
  }
}
