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
import {Vente} from '../models';
import {VenteRepository} from '../repositories';

export class VenteController {
  constructor(
    @repository(VenteRepository)
    public venteRepository : VenteRepository,
  ) {}

  @post('/ventes')
  @response(200, {
    description: 'Vente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vente, {
            title: 'NewVente',
            exclude: ['id'],
          }),
        },
      },
    })
    vente: Omit<Vente, 'id'>,
  ): Promise<Vente> {
    return this.venteRepository.create(vente);
  }

  @get('/ventes/count')
  @response(200, {
    description: 'Vente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vente) where?: Where<Vente>,
  ): Promise<Count> {
    return this.venteRepository.count(where);
  }

  @get('/ventes')
  @response(200, {
    description: 'Array of Vente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vente) filter?: Filter<Vente>,
  ): Promise<Vente[]> {
    return this.venteRepository.find(filter);
  }

  @patch('/ventes')
  @response(200, {
    description: 'Vente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vente, {partial: true}),
        },
      },
    })
    vente: Vente,
    @param.where(Vente) where?: Where<Vente>,
  ): Promise<Count> {
    return this.venteRepository.updateAll(vente, where);
  }

  @get('/ventes/{id}')
  @response(200, {
    description: 'Vente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Vente, {exclude: 'where'}) filter?: FilterExcludingWhere<Vente>
  ): Promise<Vente> {
    return this.venteRepository.findById(id, filter);
  }

  @patch('/ventes/{id}')
  @response(204, {
    description: 'Vente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vente, {partial: true}),
        },
      },
    })
    vente: Vente,
  ): Promise<void> {
    await this.venteRepository.updateById(id, vente);
  }

  @put('/ventes/{id}')
  @response(204, {
    description: 'Vente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() vente: Vente,
  ): Promise<void> {
    await this.venteRepository.replaceById(id, vente);
  }

  @del('/ventes/{id}')
  @response(204, {
    description: 'Vente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.venteRepository.deleteById(id);
  }
}
