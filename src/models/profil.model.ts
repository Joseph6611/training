import {Entity, model, property} from '@loopback/repository';

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
  

  constructor(data?: Partial<Profil>) {
    super(data);
  }
}

export interface ProfilRelations {
  // describe navigational properties here
}

export type ProfilWithRelations = Profil & ProfilRelations;
