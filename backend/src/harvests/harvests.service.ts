
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Harvest, HarvestDocument } from './schemas/harvest.schema';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';

@Injectable()
export class HarvestsService {
  constructor(
    @InjectModel(Harvest.name) private harvestModel: Model<HarvestDocument>,
  ) {}

  async create(createHarvestDto: CreateHarvestDto): Promise<Harvest> {
    const harvestData = {
      ...createHarvestDto,
      inStock: createHarvestDto.inStock || createHarvestDto.quantity,
    };
    const harvest = new this.harvestModel(harvestData);
    return harvest.save();
  }

  async findAll(): Promise<Harvest[]> {
    return this.harvestModel.find().exec();
  }

  async findOne(id: string): Promise<Harvest> {
    const harvest = await this.harvestModel.findById(id).exec();
    if (!harvest) {
      throw new NotFoundException(`Récolte avec l'ID ${id} non trouvée`);
    }
    return harvest;
  }

  async update(id: string, updateHarvestDto: UpdateHarvestDto): Promise<Harvest> {
    const harvest = await this.harvestModel
      .findByIdAndUpdate(id, updateHarvestDto, { new: true })
      .exec();
    
    if (!harvest) {
      throw new NotFoundException(`Récolte avec l'ID ${id} non trouvée`);
    }
    return harvest;
  }

  async remove(id: string): Promise<void> {
    const result = await this.harvestModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Récolte avec l'ID ${id} non trouvée`);
    }
  }

  async updateStock(id: string, quantitySold: number): Promise<Harvest> {
    const harvest = await this.findOne(id);
    const newStock = harvest.inStock - quantitySold;
    
    if (newStock < 0) {
      throw new Error('Stock insuffisant');
    }

    return this.update(id, { inStock: newStock });
  }
}
