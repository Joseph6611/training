import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {User, UserRelations, Transaction, Profil, Wallet, Documentation} from '../models';
import {TransactionRepository} from './transaction.repository';
import {ProfilRepository} from './profil.repository';
import {WalletRepository} from './wallet.repository';
import {DocumentationRepository} from './documentation.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly transactions: HasManyRepositoryFactory<Transaction, typeof User.prototype.id>;

  public readonly profil: HasOneRepositoryFactory<Profil, typeof User.prototype.id>;

  public readonly wallet: HasOneRepositoryFactory<Wallet, typeof User.prototype.id>;

  public readonly documentations: HasManyRepositoryFactory<Documentation, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TransactionRepository') protected transactionRepositoryGetter: Getter<TransactionRepository>, @repository.getter('ProfilRepository') protected profilRepositoryGetter: Getter<ProfilRepository>, @repository.getter('WalletRepository') protected walletRepositoryGetter: Getter<WalletRepository>, @repository.getter('DocumentationRepository') protected documentationRepositoryGetter: Getter<DocumentationRepository>,
   ) {
    super(User, dataSource);
    this.documentations = this.createHasManyRepositoryFactoryFor('documentations', documentationRepositoryGetter,);
    this.registerInclusionResolver('documentations', this.documentations.inclusionResolver);
    this.wallet = this.createHasOneRepositoryFactoryFor('wallet', walletRepositoryGetter);
    this.registerInclusionResolver('wallet', this.wallet.inclusionResolver);
    this.profil = this.createHasOneRepositoryFactoryFor('profil', profilRepositoryGetter);
    this.registerInclusionResolver('profil', this.profil.inclusionResolver);
    this.transactions = this.createHasManyRepositoryFactoryFor('transactions', transactionRepositoryGetter,);
    this.registerInclusionResolver('transactions', this.transactions.inclusionResolver);
  }
}
