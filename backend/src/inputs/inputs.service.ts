
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Input, InputDocument } from './schemas/input.schema';
import { CreateInputDto } from './dto/create-input.dto';
import { UpdateInputDto } from './dto/update-input.dto';

@Injectable()
export class InputsService {
  constructor(
    @InjectModel(Input.name) private inputModel: Model<InputDocument>,
  ) {}

  async create(createInputDto: CreateInputDto): Promise<Input> {
    const inputData = {
      ...createInputDto,
      inStock: createInputDto.inStock || createInputDto.quantity,
    };
    const input = new this.inputModel(inputData);
    return input.save();
  }

  async findAll(): Promise<Input[]> {
    return this.inputModel.find().exec();
  }

  async findOne(id: string): Promise<Input> {
    const input = await this.inputModel.findById(id).exec();
    if (!input) {
      throw new NotFoundException(`Intrant avec l'ID ${id} non trouvé`);
    }
    return input;
  }

  async update(id: string, updateInputDto: UpdateInputDto): Promise<Input> {
    const input = await this.inputModel
      .findByIdAndUpdate(id, updateInputDto, { new: true })
      .exec();
    
    if (!input) {
      throw new NotFoundException(`Intrant avec l'ID ${id} non trouvé`);
    }
    return input;
  }

  async remove(id: string): Promise<void> {
    const result = await this.inputModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Intrant avec l'ID ${id} non trouvé`);
    }
  }

  async updateStock(id: string, quantityUsed: number): Promise<Input> {
    const input = await this.findOne(id);
    const newStock = input.inStock - quantityUsed;
    
    if (newStock < 0) {
      throw new Error('Stock insuffisant');
    }

    return this.update(id, { inStock: newStock });
  }
}
