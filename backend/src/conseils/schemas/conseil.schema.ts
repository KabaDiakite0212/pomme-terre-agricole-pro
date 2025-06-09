
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConseilDocument = Conseil & Document;

@Schema({ timestamps: true })
export class Conseil {
  @Prop({ required: true })
  titre: string;

  @Prop({ required: true })
  contenu: string;

  @Prop({ required: true })
  auteur: string;

  @Prop()
  categorie?: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: Date.now })
  dateCreation: Date;

  @Prop({ default: Date.now })
  dateModification: Date;
}

export const ConseilSchema = SchemaFactory.createForClass(Conseil);
