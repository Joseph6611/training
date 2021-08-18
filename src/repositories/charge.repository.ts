import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Charge, ChargeRelations} from '../models';

export class ChargeRepository extends DefaultCrudRepository<
  Charge,
  typeof Charge.prototype.id,
  ChargeRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Charge, dataSource);
  }
}
