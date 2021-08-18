import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Documentation extends Entity {
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
  file: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'date',
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  updated_at?: string;

  @belongsTo(() => User)
  userId: number;

  constructor(data?: Partial<Documentation>) {
    super(data);
  }
}

export interface DocumentationRelations {
  // describe navigational properties here
}

export type DocumentationWithRelations = Documentation & DocumentationRelations;
