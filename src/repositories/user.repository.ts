import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Profil, User, UserRelations} from '../models';
import {ProfilRepository} from './profil.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly profil: HasOneRepositoryFactory<
  Profil,
  typeof User.prototype.id
>;
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('ProfilRepository')
    getProfilRepository: Getter<ProfilRepository>,
  ) {
    super(User, dataSource);
    this.profil = this.createHasOneRepositoryFactoryFor(
      'profil',
      getProfilRepository,
    );
  }
}
