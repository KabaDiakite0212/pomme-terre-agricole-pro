
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ConservationService } from './conservation.service';
import { CreateConservationDto } from './dto/create-conservation.dto';
import { UpdateConservationDto } from './dto/update-conservation.dto';

@ApiTags('conservation')
@Controller('conservation')
export class ConservationController {
  constructor(private readonly conservationService: ConservationService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel élément de conservation' })
  @ApiResponse({ status: 201, description: 'Élément créé avec succès' })
  create(@Body() createConservationDto: CreateConservationDto) {
    return this.conservationService.create(createConservationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les éléments de conservation' })
  @ApiResponse({ status: 200, description: 'Liste des éléments' })
  @ApiQuery({ name: 'type', required: false, description: 'Filtrer par type' })
  @ApiQuery({ name: 'parentId', required: false, description: 'Filtrer par parent' })
  findAll(@Query('type') type?: string, @Query('parentId') parentId?: string) {
    if (type) {
      return this.conservationService.findByType(type);
    }
    if (parentId) {
      return this.conservationService.findByParent(parentId);
    }
    return this.conservationService.findAll();
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Récupérer les statistiques de conservation' })
  @ApiResponse({ status: 200, description: 'Statistiques' })
  getStatistics() {
    return this.conservationService.getStatistics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un élément par ID' })
  @ApiResponse({ status: 200, description: 'Élément trouvé' })
  @ApiResponse({ status: 404, description: 'Élément non trouvé' })
  findOne(@Param('id') id: string) {
    return this.conservationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un élément' })
  @ApiResponse({ status: 200, description: 'Élément mis à jour' })
  @ApiResponse({ status: 404, description: 'Élément non trouvé' })
  update(@Param('id') id: string, @Body() updateConservationDto: UpdateConservationDto) {
    return this.conservationService.update(id, updateConservationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un élément' })
  @ApiResponse({ status: 200, description: 'Élément supprimé' })
  @ApiResponse({ status: 404, description: 'Élément non trouvé' })
  remove(@Param('id') id: string) {
    return this.conservationService.remove(id);
  }

  @Post(':id/assign')
  @ApiOperation({ summary: 'Assigner une récolte à un emplacement' })
  @ApiResponse({ status: 200, description: 'Récolte assignée' })
  assignRecolte(@Param('id') id: string, @Body() body: { recolteId: string }) {
    return this.conservationService.assignRecolte(id, body.recolteId);
  }

  @Post(':id/liberer')
  @ApiOperation({ summary: 'Libérer un emplacement' })
  @ApiResponse({ status: 200, description: 'Emplacement libéré' })
  libererEmplacement(@Param('id') id: string) {
    return this.conservationService.libererEmplacement(id);
  }
}
