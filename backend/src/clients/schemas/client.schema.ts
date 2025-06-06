
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema({ timestamps: true })
export class Client {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ default: 'Actif' })
  status: string;

  @Prop()
  notes?: string;

  @Prop({ default: 0 })
  totalPurchases: number;

  @Prop({ default: 0 })
  totalAmount: number;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
