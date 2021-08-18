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
import {Charge} from '../models';
import {ChargeRepository} from '../repositories';

export class ChargeController {
  constructor(
    @repository(ChargeRepository)
    public chargeRepository : ChargeRepository,
  ) {}

  @post('/charges')
  @response(200, {
    description: 'Charge model instance',
    content: {'application/json': {schema: getModelSchemaRef(Charge)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Charge, {
            title: 'NewCharge',
            exclude: ['id'],
          }),
        },
      },
    })
    charge: Omit<Charge, 'id'>,
  ): Promise<Charge> {
    return this.chargeRepository.create(charge);
  }

  @get('/charges/count')
  @response(200, {
    description: 'Charge model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Charge) where?: Where<Charge>,
  ): Promise<Count> {
    return this.chargeRepository.count(where);
  }

  @get('/charges')
  @response(200, {
    description: 'Array of Charge model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Charge, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Charge) filter?: Filter<Charge>,
  ): Promise<Charge[]> {
    return this.chargeRepository.find(filter);
  }

  @patch('/charges')
  @response(200, {
    description: 'Charge PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Charge, {partial: true}),
        },
      },
    })
    charge: Charge,
    @param.where(Charge) where?: Where<Charge>,
  ): Promise<Count> {
    return this.chargeRepository.updateAll(charge, where);
  }

  @get('/charges/{id}')
  @response(200, {
    description: 'Charge model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Charge, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Charge, {exclude: 'where'}) filter?: FilterExcludingWhere<Charge>
  ): Promise<Charge> {
    return this.chargeRepository.findById(id, filter);
  }

  @patch('/charges/{id}')
  @response(204, {
    description: 'Charge PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Charge, {partial: true}),
        },
      },
    })
    charge: Charge,
  ): Promise<void> {
    await this.chargeRepository.updateById(id, charge);
  }

  @put('/charges/{id}')
  @response(204, {
    description: 'Charge PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() charge: Charge,
  ): Promise<void> {
    await this.chargeRepository.replaceById(id, charge);
  }

  @del('/charges/{id}')
  @response(204, {
    description: 'Charge DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.chargeRepository.deleteById(id);
  }
}
