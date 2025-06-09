
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conservation, ConservationDocument } from './schemas/conservation.schema';
import { CreateConservationDto } from './dto/create-conservation.dto';
import { UpdateConservationDto } from './dto/update-conservation.dto';

@Injectable()
export class ConservationService {
  constructor(
    @InjectModel(Conservation.name) private conservationModel: Model<ConservationDocument>,
  ) {}

  async create(createConservationDto: CreateConservationDto): Promise<Conservation> {
    const conservation = new this.conservationModel(createConservationDto);
    return conservation.save();
  }

  async findAll(): Promise<Conservation[]> {
    return this.conservationModel.find().exec();
  }

  async findByType(type: string): Promise<Conservation[]> {
    return this.conservationModel.find({ type }).exec();
  }

  async findByParent(parentId: string): Promise<Conservation[]> {
    return this.conservationModel.find({ parentId }).exec();
  }

  async findOne(id: string): Promise<Conservation> {
    const conservation = await this.conservationModel.findById(id).exec();
    if (!conservation) {
      throw new NotFoundException(`Conservation avec l'ID ${id} non trouvée`);
    }
    return conservation;
  }

  async update(id: string, updateConservationDto: UpdateConservationDto): Promise<Conservation> {
    const conservation = await this.conservationModel
      .findByIdAndUpdate(id, updateConservationDto, { new: true })
      .exec();
    
    if (!conservation) {
      throw new NotFoundException(`Conservation avec l'ID ${id} non trouvée`);
    }
    return conservation;
  }

  async remove(id: string): Promise<void> {
    const result = await this.conservationModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Conservation avec l'ID ${id} non trouvée`);
    }
  }

  async assignRecolte(conservationId: string, recolteId: string): Promise<Conservation> {
    const conservation = await this.findOne(conservationId);
    
    if (conservation.recolteId) {
      throw new Error('Cet emplacement est déjà occupé');
    }

    return this.update(conservationId, {
      recolteId,
      dateAssignation: new Date(),
      status: 'Occupé'
    });
  }

  async libererEmplacement(conservationId: string): Promise<Conservation> {
    return this.update(conservationId, {
      recolteId: undefined,
      dateAssignation: undefined,
      status: 'Disponible'
    });
  }

  async getStatistics() {
    const total = await this.conservationModel.countDocuments().exec();
    const cases = await this.conservationModel.countDocuments({ type: 'case' }).exec();
    const tapis = await this.conservationModel.countDocuments({ type: 'tapis' }).exec();
    const lignes = await this.conservationModel.countDocuments({ type: 'ligne' }).exec();
    const occupes = await this.conservationModel.countDocuments({ status: 'Occupé' }).exec();
    
    return {
      total,
      cases,
      tapis,
      lignes,
      occupes,
      disponibles: total - occupes,
      tauxOccupation: total > 0 ? Math.round((occupes / total) * 100) : 0
    };
  }
}
