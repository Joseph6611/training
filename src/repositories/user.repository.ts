import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepository, HasManyRepositoryFactory, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Profil, Transaction, User, UserRelations} from '../models';
import {ProfilRepository} from './profil.repository';
import {TransactionRepository} from './transaction.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly profil: HasOneRepositoryFactory<
  Profil,
  typeof User.prototype.id
>;

public readonly transactions: HasManyRepositoryFactory<
Transaction,
typeof User.prototype.id
>;
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('ProfilRepository')
    getProfilRepository: Getter<ProfilRepository>,

    @repository.getter('TransactionRepository')
    transactionRepositoryGetter: Getter<TransactionRepository>,
  ) {
    super(User, dataSource);
    this.profil = this.createHasOneRepositoryFactoryFor(
      'profil',
      getProfilRepository,
    );
    this.transactions = this.createHasManyRepositoryFactoryFor(
     'transactions',
     transactionRepositoryGetter,
    );
  }
}
