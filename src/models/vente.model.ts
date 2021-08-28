import {Entity, model, property} from '@loopback/repository';

@model()
export class Vente extends Entity {
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
    type: 'date',
  })
  created_at: string;

  @property({
    type: 'date',
  })
  updated_at?: string;

  constructor(data?: Partial<Vente>) {
    super(data);
  }
}

export interface VenteRelations {
  // describe navigational properties here
}

export type VenteWithRelations = Vente & VenteRelations;
