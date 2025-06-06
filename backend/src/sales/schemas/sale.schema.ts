
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SaleDocument = Sale & Document;

@Schema({ timestamps: true })
export class Sale {
  @Prop()
  harvestId?: string;

  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true })
  product: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  unitPrice: number;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({ required: true })
  saleDate: Date;

  @Prop({ default: 'Confirmée' })
  status: string;

  @Prop()
  notes?: string;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
