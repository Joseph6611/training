import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Vente, VenteRelations} from '../models';

export class VenteRepository extends DefaultCrudRepository<
  Vente,
  typeof Vente.prototype.id,
  VenteRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Vente, dataSource);
  }
}
