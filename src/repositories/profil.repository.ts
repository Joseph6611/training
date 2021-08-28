import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Profil, ProfilRelations} from '../models';

export class ProfilRepository extends DefaultCrudRepository<
  Profil,
  typeof Profil.prototype.id,
  ProfilRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Profil, dataSource);
  }
}
