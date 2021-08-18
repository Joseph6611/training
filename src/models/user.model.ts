import {belongsTo, Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Profil, ProfilWithRelations} from './profil.model';
import {Transaction} from './transaction.model';
import {Wallet} from './wallet.model';
import {Documentation} from './documentation.model';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  contact: string;

  @property({
    type: 'date',
    required: true,
  })
  birthday: string;

  @property({
    type: 'number',
  })
  pourcentage?: number;

  @property({
    type: 'boolean',
    default: false,
  })
  online: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'number',
  })
  amount?: number;

  @property({
    type: 'string',
    required: true,
  })
  ref: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'date',
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  updated_at?: string;

  @property({
    type: 'number',
    required: true,
  })
  part: number;

  @property({
    type: 'boolean',
    required: true,
  })
  firstconnect: boolean;

  @hasMany(() => Transaction)
  transactions: Transaction[];

  @hasOne(() => Profil)
  profil: Profil;

  @hasOne(() => Wallet)
  wallet: Wallet;

  @hasMany(() => Documentation)
  documentations: Documentation[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
