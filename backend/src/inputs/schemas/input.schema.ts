
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InputDocument = Input & Document;

@Schema({ timestamps: true })
export class Input {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  unit: string;

  @Prop({ required: true })
  unitPrice: number;

  @Prop({ required: true })
  supplier: string;

  @Prop({ required: true })
  purchaseDate: Date;

  @Prop()
  expiryDate?: Date;

  @Prop({ default: 'En stock' })
  status: string;

  @Prop()
  inStock: number;

  @Prop()
  notes?: string;
}

export const InputSchema = SchemaFactory.createForClass(Input);
