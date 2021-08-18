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
import {Profil} from '../models';
import {ProfilRepository} from '../repositories';

export class ProfilController {
  constructor(
    @repository(ProfilRepository)
    public profilRepository : ProfilRepository,
  ) {}

  @post('/profils')
  @response(200, {
    description: 'Profil model instance',
    content: {'application/json': {schema: getModelSchemaRef(Profil)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profil, {
            title: 'NewProfil',
            exclude: ['id'],
          }),
        },
      },
    })
    profil: Omit<Profil, 'id'>,
  ): Promise<Profil> {
    return this.profilRepository.create(profil);
  }

  @get('/profils/count')
  @response(200, {
    description: 'Profil model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Profil) where?: Where<Profil>,
  ): Promise<Count> {
    return this.profilRepository.count(where);
  }

  @get('/profils')
  @response(200, {
    description: 'Array of Profil model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Profil, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Profil) filter?: Filter<Profil>,
  ): Promise<Profil[]> {
    return this.profilRepository.find(filter);
  }

  @patch('/profils')
  @response(200, {
    description: 'Profil PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profil, {partial: true}),
        },
      },
    })
    profil: Profil,
    @param.where(Profil) where?: Where<Profil>,
  ): Promise<Count> {
    return this.profilRepository.updateAll(profil, where);
  }

  @get('/profils/{id}')
  @response(200, {
    description: 'Profil model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Profil, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Profil, {exclude: 'where'}) filter?: FilterExcludingWhere<Profil>
  ): Promise<Profil> {
    return this.profilRepository.findById(id, filter);
  }

  @patch('/profils/{id}')
  @response(204, {
    description: 'Profil PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profil, {partial: true}),
        },
      },
    })
    profil: Profil,
  ): Promise<void> {
    await this.profilRepository.updateById(id, profil);
  }

  @put('/profils/{id}')
  @response(204, {
    description: 'Profil PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() profil: Profil,
  ): Promise<void> {
    await this.profilRepository.replaceById(id, profil);
  }

  @del('/profils/{id}')
  @response(204, {
    description: 'Profil DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.profilRepository.deleteById(id);
  }
}
