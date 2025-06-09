
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConservationDocument = Conservation & Document;

@Schema({ timestamps: true })
export class Conservation {
  @Prop({ required: true })
  type: string; // 'case', 'tapis', 'ligne'

  @Prop({ required: true })
  nom: string;

  @Prop()
  parentId?: string; // ID du parent (case pour tapis, tapis pour ligne)

  @Prop({ default: 0 })
  capaciteMax: number;

  @Prop({ default: 0 })
  capaciteUtilisee: number;

  @Prop()
  description?: string;

  @Prop({ default: 'Disponible' })
  status: string;

  @Prop()
  temperature?: number;

  @Prop()
  humidite?: number;

  @Prop()
  recolteId?: string; // ID de la récolte assignée

  @Prop()
  dateAssignation?: Date;

  @Prop()
  notes?: string;
}

export const ConservationSchema = SchemaFactory.createForClass(Conservation);
