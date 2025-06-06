
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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';

@ApiTags('fields')
@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau champ' })
  @ApiResponse({ status: 201, description: 'Champ créé avec succès' })
  create(@Body() createFieldDto: CreateFieldDto) {
    return this.fieldsService.create(createFieldDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les champs' })
  @ApiResponse({ status: 200, description: 'Liste des champs' })
  findAll(@Query('surfaceId') surfaceId?: string) {
    if (surfaceId) {
      return this.fieldsService.findBySurface(surfaceId);
    }
    return this.fieldsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un champ par ID' })
  @ApiResponse({ status: 200, description: 'Champ trouvé' })
  @ApiResponse({ status: 404, description: 'Champ non trouvé' })
  findOne(@Param('id') id: string) {
    return this.fieldsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un champ' })
  @ApiResponse({ status: 200, description: 'Champ mis à jour' })
  @ApiResponse({ status: 404, description: 'Champ non trouvé' })
  update(@Param('id') id: string, @Body() updateFieldDto: UpdateFieldDto) {
    return this.fieldsService.update(id, updateFieldDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un champ' })
  @ApiResponse({ status: 200, description: 'Champ supprimé' })
  @ApiResponse({ status: 404, description: 'Champ non trouvé' })
  remove(@Param('id') id: string) {
    return this.fieldsService.remove(id);
  }
}
