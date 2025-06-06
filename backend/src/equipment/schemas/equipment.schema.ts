
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EquipmentDocument = Equipment & Document;

@Schema({ timestamps: true })
export class Equipment {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  purchaseDate: Date;

  @Prop({ required: true })
  purchasePrice: number;

  @Prop({ default: 'Opérationnel' })
  status: string;

  @Prop()
  lastMaintenance?: Date;

  @Prop()
  nextMaintenance?: Date;

  @Prop()
  notes?: string;
}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);
