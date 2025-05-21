// src/cars/schemas/car.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarDocument = Car & Document;

@Schema()
export class Car {
  @Prop({ required: true })
  placa: string;

  @Prop({ required: true })
  chassi: string;

  @Prop({ required: true })
  renavam: string;

  @Prop({ required: true })
  modelo: string;

  @Prop({ required: true})
  marca: string;

  @Prop({ required: true})
  ano: number;
}


export const CarSchema = SchemaFactory.createForClass(Car);
