
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
import { HarvestsService } from './harvests.service';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';

@ApiTags('harvests')
@Controller('harvests')
export class HarvestsController {
  constructor(private readonly harvestsService: HarvestsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle récolte' })
  @ApiResponse({ status: 201, description: 'Récolte créée avec succès' })
  create(@Body() createHarvestDto: CreateHarvestDto) {
    return this.harvestsService.create(createHarvestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les récoltes' })
  @ApiResponse({ status: 200, description: 'Liste des récoltes' })
  findAll() {
    return this.harvestsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une récolte par ID' })
  @ApiResponse({ status: 200, description: 'Récolte trouvée' })
  @ApiResponse({ status: 404, description: 'Récolte non trouvée' })
  findOne(@Param('id') id: string) {
    return this.harvestsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une récolte' })
  @ApiResponse({ status: 200, description: 'Récolte mise à jour' })
  @ApiResponse({ status: 404, description: 'Récolte non trouvée' })
  update(@Param('id') id: string, @Body() updateHarvestDto: UpdateHarvestDto) {
    return this.harvestsService.update(id, updateHarvestDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une récolte' })
  @ApiResponse({ status: 200, description: 'Récolte supprimée' })
  @ApiResponse({ status: 404, description: 'Récolte non trouvée' })
  remove(@Param('id') id: string) {
    return this.harvestsService.remove(id);
  }
}
