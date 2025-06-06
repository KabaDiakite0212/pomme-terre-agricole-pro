
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@ApiTags('sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle vente' })
  @ApiResponse({ status: 201, description: 'Vente créée avec succès' })
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les ventes' })
  @ApiResponse({ status: 200, description: 'Liste des ventes' })
  findAll() {
    return this.salesService.findAll();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Statistiques des ventes' })
  @ApiResponse({ status: 200, description: 'Statistiques' })
  getStats() {
    return this.salesService.getSalesStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une vente par ID' })
  @ApiResponse({ status: 200, description: 'Vente trouvée' })
  @ApiResponse({ status: 404, description: 'Vente non trouvée' })
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une vente' })
  @ApiResponse({ status: 200, description: 'Vente mise à jour' })
  @ApiResponse({ status: 404, description: 'Vente non trouvée' })
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(id, updateSaleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une vente' })
  @ApiResponse({ status: 200, description: 'Vente supprimée' })
  @ApiResponse({ status: 404, description: 'Vente non trouvée' })
  remove(@Param('id') id: string) {
    return this.salesService.remove(id);
  }
}
