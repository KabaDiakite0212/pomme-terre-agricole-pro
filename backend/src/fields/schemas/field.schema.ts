
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FieldDocument = Field & Document;

@Schema({ timestamps: true })
export class Field {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surfaceId: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  variety: string;

  @Prop({ required: true })
  plantingDate: Date;

  @Prop()
  harvestDate?: Date;

  @Prop({ default: 'Planté' })
  status: string;

  @Prop({ default: 0 })
  progress: number;

  @Prop()
  notes?: string;

  @Prop({ type: Object })
  location?: {
    latitude: number;
    longitude: number;
  };
}

export const FieldSchema = SchemaFactory.createForClass(Field);
