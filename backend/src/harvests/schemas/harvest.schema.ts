
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HarvestDocument = Harvest & Document;

@Schema({ timestamps: true })
export class Harvest {
  @Prop({ required: true })
  fieldId: string;

  @Prop({ required: true })
  fieldName: string;

  @Prop({ required: true })
  variety: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  unitPrice: number;

  @Prop({ required: true })
  harvestDate: Date;

  @Prop({ required: true })
  storage: string;

  @Prop({ default: 'En stock' })
  status: string;

  @Prop()
  inStock: number;

  @Prop()
  notes?: string;
}

export const HarvestSchema = SchemaFactory.createForClass(Harvest);
