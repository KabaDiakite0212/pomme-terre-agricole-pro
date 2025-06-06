
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
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@ApiTags('equipment')
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel équipement' })
  @ApiResponse({ status: 201, description: 'Équipement créé avec succès' })
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentService.create(createEquipmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les équipements' })
  @ApiResponse({ status: 200, description: 'Liste des équipements' })
  findAll() {
    return this.equipmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un équipement par ID' })
  @ApiResponse({ status: 200, description: 'Équipement trouvé' })
  @ApiResponse({ status: 404, description: 'Équipement non trouvé' })
  findOne(@Param('id') id: string) {
    return this.equipmentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un équipement' })
  @ApiResponse({ status: 200, description: 'Équipement mis à jour' })
  @ApiResponse({ status: 404, description: 'Équipement non trouvé' })
  update(@Param('id') id: string, @Body() updateEquipmentDto: UpdateEquipmentDto) {
    return this.equipmentService.update(id, updateEquipmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un équipement' })
  @ApiResponse({ status: 200, description: 'Équipement supprimé' })
  @ApiResponse({ status: 404, description: 'Équipement non trouvé' })
  remove(@Param('id') id: string) {
    return this.equipmentService.remove(id);
  }
}
