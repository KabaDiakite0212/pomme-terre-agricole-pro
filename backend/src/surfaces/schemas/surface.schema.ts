
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SurfaceDocument = Surface & Document;

@Schema({ timestamps: true })
export class Surface {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  soilType: string;

  @Prop()
  description?: string;

  @Prop({ default: 'Disponible' })
  status: string;

  @Prop({ type: Object })
  coordinates?: {
    latitude: number;
    longitude: number;
  };

  @Prop()
  notes?: string;
}

export const SurfaceSchema = SchemaFactory.createForClass(Surface);
