import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User, UserWithRelations} from './user.model';

@model()
export class Transaction extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'number',
    required: true,
  })
  solde: number;

  @property({
    type: 'string',
  })
  payment_id?: string;

  @property({
    type: 'string',
  })
  payment_ref?: string;

  @property({
    type: 'number',
  })
  isAdmin?: number;

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
    default: 0,
  })
  step?: number;

  @property({
    type: 'string',
    required: true,
  })
  numero: string;

  @belongsTo(()=> User,{name: 'user'})
  userId: number;

  constructor(data?: Partial<Transaction>) {
    super(data);
  }
}

export interface TransactionRelations {
  user?: UserWithRelations;
  // describe navigational properties here
}

export type TransactionWithRelations = Transaction & TransactionRelations;
