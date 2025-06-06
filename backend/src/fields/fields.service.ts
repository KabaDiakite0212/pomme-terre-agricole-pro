
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Field, FieldDocument } from './schemas/field.schema';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';

@Injectable()
export class FieldsService {
  constructor(
    @InjectModel(Field.name) private fieldModel: Model<FieldDocument>,
  ) {}

  async create(createFieldDto: CreateFieldDto): Promise<Field> {
    const field = new this.fieldModel(createFieldDto);
    return field.save();
  }

  async findAll(): Promise<Field[]> {
    return this.fieldModel.find().exec();
  }

  async findOne(id: string): Promise<Field> {
    const field = await this.fieldModel.findById(id).exec();
    if (!field) {
      throw new NotFoundException(`Champ avec l'ID ${id} non trouvé`);
    }
    return field;
  }

  async update(id: string, updateFieldDto: UpdateFieldDto): Promise<Field> {
    const field = await this.fieldModel
      .findByIdAndUpdate(id, updateFieldDto, { new: true })
      .exec();
    
    if (!field) {
      throw new NotFoundException(`Champ avec l'ID ${id} non trouvé`);
    }
    return field;
  }

  async remove(id: string): Promise<void> {
    const result = await this.fieldModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Champ avec l'ID ${id} non trouvé`);
    }
  }

  async findBySurface(surfaceId: string): Promise<Field[]> {
    return this.fieldModel.find({ surfaceId }).exec();
  }
}
