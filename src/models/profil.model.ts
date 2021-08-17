import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {User} from '.';
import {UserWithRelations} from './user.model';

@model()
export class Profil extends Entity {
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
  link: string;

  @property({
    type: 'date',
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  updated_at?: string;

  @belongsTo(()=> User)
  userId?: number;

  constructor(data?: Partial<Profil>) {
    super(data);
  }
}

export interface ProfilRelations {
  user?: UserWithRelations;
  // describe navigational properties here
}

export type ProfilWithRelations = Profil & ProfilRelations;
