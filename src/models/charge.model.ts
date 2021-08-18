import {Entity, model, property} from '@loopback/repository';

@model()
export class Charge extends Entity {
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
  created_at?: string;

  @property({
    type: 'date',
  })
  updated_at?: string;

  @property({
    type: 'number',
    required: true,
  })
  ventedumois: number;

  @property({
    type: 'number',
    required: true,
  })
  benefice: number;

  @property({
    type: 'date',
    required: true,
  })
  begining: string;

  @property({
    type: 'date',
    required: true,
  })
  ending: string;

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  shared: boolean;


  constructor(data?: Partial<Charge>) {
    super(data);
  }
}

export interface ChargeRelations {
  // describe navigational properties here
}

export type ChargeWithRelations = Charge & ChargeRelations;
