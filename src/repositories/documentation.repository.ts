import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Documentation, DocumentationRelations} from '../models';

export class DocumentationRepository extends DefaultCrudRepository<
  Documentation,
  typeof Documentation.prototype.id,
  DocumentationRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Documentation, dataSource);
  }
}
