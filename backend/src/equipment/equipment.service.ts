
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Equipment, EquipmentDocument } from './schemas/equipment.schema';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectModel(Equipment.name) private equipmentModel: Model<EquipmentDocument>,
  ) {}

  async create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
    const equipment = new this.equipmentModel(createEquipmentDto);
    return equipment.save();
  }

  async findAll(): Promise<Equipment[]> {
    return this.equipmentModel.find().exec();
  }

  async findOne(id: string): Promise<Equipment> {
    const equipment = await this.equipmentModel.findById(id).exec();
    if (!equipment) {
      throw new NotFoundException(`Équipement avec l'ID ${id} non trouvé`);
    }
    return equipment;
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment> {
    const equipment = await this.equipmentModel
      .findByIdAndUpdate(id, updateEquipmentDto, { new: true })
      .exec();
    
    if (!equipment) {
      throw new NotFoundException(`Équipement avec l'ID ${id} non trouvé`);
    }
    return equipment;
  }

  async remove(id: string): Promise<void> {
    const result = await this.equipmentModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Équipement avec l'ID ${id} non trouvé`);
    }
  }
}
