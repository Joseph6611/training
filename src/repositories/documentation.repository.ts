import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Documentation, DocumentationRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class DocumentationRepository extends DefaultCrudRepository<
  Documentation,
  typeof Documentation.prototype.id,
  DocumentationRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Documentation.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Documentation, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
