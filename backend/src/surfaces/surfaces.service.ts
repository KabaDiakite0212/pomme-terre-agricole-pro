
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Surface, SurfaceDocument } from './schemas/surface.schema';
import { CreateSurfaceDto } from './dto/create-surface.dto';
import { UpdateSurfaceDto } from './dto/update-surface.dto';

@Injectable()
export class SurfacesService {
  constructor(
    @InjectModel(Surface.name) private surfaceModel: Model<SurfaceDocument>,
  ) {}

  async create(createSurfaceDto: CreateSurfaceDto): Promise<Surface> {
    const surface = new this.surfaceModel(createSurfaceDto);
    return surface.save();
  }

  async findAll(): Promise<Surface[]> {
    return this.surfaceModel.find().exec();
  }

  async findOne(id: string): Promise<Surface> {
    const surface = await this.surfaceModel.findById(id).exec();
    if (!surface) {
      throw new NotFoundException(`Surface avec l'ID ${id} non trouvée`);
    }
    return surface;
  }

  async update(id: string, updateSurfaceDto: UpdateSurfaceDto): Promise<Surface> {
    const surface = await this.surfaceModel
      .findByIdAndUpdate(id, updateSurfaceDto, { new: true })
      .exec();
    
    if (!surface) {
      throw new NotFoundException(`Surface avec l'ID ${id} non trouvée`);
    }
    return surface;
  }

  async remove(id: string): Promise<void> {
    const result = await this.surfaceModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Surface avec l'ID ${id} non trouvée`);
    }
  }
}
