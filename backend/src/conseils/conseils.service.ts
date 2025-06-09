
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conseil, ConseilDocument } from './schemas/conseil.schema';
import { CreateConseilDto } from './dto/create-conseil.dto';
import { UpdateConseilDto } from './dto/update-conseil.dto';

@Injectable()
export class ConseilsService {
  constructor(
    @InjectModel(Conseil.name) private conseilModel: Model<ConseilDocument>,
  ) {}

  async create(createConseilDto: CreateConseilDto): Promise<Conseil> {
    const conseil = new this.conseilModel(createConseilDto);
    return conseil.save();
  }

  async findAll(): Promise<Conseil[]> {
    return this.conseilModel.find().sort({ dateCreation: -1 }).exec();
  }

  async findOne(id: string): Promise<Conseil> {
    return this.conseilModel.findById(id).exec();
  }

  async update(id: string, updateConseilDto: UpdateConseilDto): Promise<Conseil> {
    return this.conseilModel
      .findByIdAndUpdate(
        id,
        { ...updateConseilDto, dateModification: new Date() },
        { new: true },
      )
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.conseilModel.findByIdAndDelete(id).exec();
  }

  async findByCategory(categorie: string): Promise<Conseil[]> {
    return this.conseilModel.find({ categorie }).sort({ dateCreation: -1 }).exec();
  }

  async findByTags(tags: string[]): Promise<Conseil[]> {
    return this.conseilModel
      .find({ tags: { $in: tags } })
      .sort({ dateCreation: -1 })
      .exec();
  }
}
