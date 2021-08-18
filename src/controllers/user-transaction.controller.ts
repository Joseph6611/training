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
  Transaction,
} from '../models';
import {UserRepository} from '../repositories';

export class UserTransactionController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/transactions', {
    responses: {
      '200': {
        description: 'Array of User has many Transaction',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Transaction)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Transaction>,
  ): Promise<Transaction[]> {
    return this.userRepository.transactions(id).find(filter);
  }

  @post('/users/{id}/transactions', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transaction)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaction, {
            title: 'NewTransactionInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) transaction: Omit<Transaction, 'id'>,
  ): Promise<Transaction> {
    return this.userRepository.transactions(id).create(transaction);
  }

  @patch('/users/{id}/transactions', {
    responses: {
      '200': {
        description: 'User.Transaction PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaction, {partial: true}),
        },
      },
    })
    transaction: Partial<Transaction>,
    @param.query.object('where', getWhereSchemaFor(Transaction)) where?: Where<Transaction>,
  ): Promise<Count> {
    return this.userRepository.transactions(id).patch(transaction, where);
  }

  @del('/users/{id}/transactions', {
    responses: {
      '200': {
        description: 'User.Transaction DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Transaction)) where?: Where<Transaction>,
  ): Promise<Count> {
    return this.userRepository.transactions(id).delete(where);
  }
}
