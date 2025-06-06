
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale, SaleDocument } from './schemas/sale.schema';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { HarvestsService } from '../harvests/harvests.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale.name) private saleModel: Model<SaleDocument>,
    private harvestsService: HarvestsService,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    // Si la vente provient d'une récolte, mettre à jour le stock
    if (createSaleDto.harvestId) {
      await this.harvestsService.updateStock(
        createSaleDto.harvestId,
        createSaleDto.quantity,
      );
    }

    const sale = new this.saleModel(createSaleDto);
    return sale.save();
  }

  async findAll(): Promise<Sale[]> {
    return this.saleModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Sale> {
    const sale = await this.saleModel.findById(id).exec();
    if (!sale) {
      throw new NotFoundException(`Vente avec l'ID ${id} non trouvée`);
    }
    return sale;
  }

  async update(id: string, updateSaleDto: UpdateSaleDto): Promise<Sale> {
    const sale = await this.saleModel
      .findByIdAndUpdate(id, updateSaleDto, { new: true })
      .exec();
    
    if (!sale) {
      throw new NotFoundException(`Vente avec l'ID ${id} non trouvée`);
    }
    return sale;
  }

  async remove(id: string): Promise<void> {
    const result = await this.saleModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Vente avec l'ID ${id} non trouvée`);
    }
  }

  async getSalesStats() {
    const totalSales = await this.saleModel.countDocuments();
    const totalRevenue = await this.saleModel.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    return {
      totalSales,
      totalRevenue: totalRevenue[0]?.total || 0,
    };
  }
}
