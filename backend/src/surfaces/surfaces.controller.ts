
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
import { SurfacesService } from './surfaces.service';
import { CreateSurfaceDto } from './dto/create-surface.dto';
import { UpdateSurfaceDto } from './dto/update-surface.dto';

@ApiTags('surfaces')
@Controller('surfaces')
export class SurfacesController {
  constructor(private readonly surfacesService: SurfacesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle surface' })
  @ApiResponse({ status: 201, description: 'Surface créée avec succès' })
  create(@Body() createSurfaceDto: CreateSurfaceDto) {
    return this.surfacesService.create(createSurfaceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les surfaces' })
  @ApiResponse({ status: 200, description: 'Liste des surfaces' })
  findAll() {
    return this.surfacesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une surface par ID' })
  @ApiResponse({ status: 200, description: 'Surface trouvée' })
  @ApiResponse({ status: 404, description: 'Surface non trouvée' })
  findOne(@Param('id') id: string) {
    return this.surfacesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une surface' })
  @ApiResponse({ status: 200, description: 'Surface mise à jour' })
  @ApiResponse({ status: 404, description: 'Surface non trouvée' })
  update(@Param('id') id: string, @Body() updateSurfaceDto: UpdateSurfaceDto) {
    return this.surfacesService.update(id, updateSurfaceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une surface' })
  @ApiResponse({ status: 200, description: 'Surface supprimée' })
  @ApiResponse({ status: 404, description: 'Surface non trouvée' })
  remove(@Param('id') id: string) {
    return this.surfacesService.remove(id);
  }
}
