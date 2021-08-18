import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Profil, ProfilRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class ProfilRepository extends DefaultCrudRepository<
  Profil,
  typeof Profil.prototype.id,
  ProfilRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Profil.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Profil, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
