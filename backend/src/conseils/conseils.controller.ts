
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
import { ConseilsService } from './conseils.service';
import { CreateConseilDto } from './dto/create-conseil.dto';
import { UpdateConseilDto } from './dto/update-conseil.dto';

@ApiTags('conseils')
@Controller('conseils')
export class ConseilsController {
  constructor(private readonly conseilsService: ConseilsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau conseil' })
  @ApiResponse({ status: 201, description: 'Conseil créé avec succès.' })
  create(@Body() createConseilDto: CreateConseilDto) {
    return this.conseilsService.create(createConseilDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les conseils' })
  @ApiResponse({ status: 200, description: 'Liste des conseils récupérée.' })
  findAll(@Query('categorie') categorie?: string, @Query('tags') tags?: string) {
    if (categorie) {
      return this.conseilsService.findByCategory(categorie);
    }
    if (tags) {
      const tagsArray = tags.split(',');
      return this.conseilsService.findByTags(tagsArray);
    }
    return this.conseilsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un conseil par ID' })
  @ApiResponse({ status: 200, description: 'Conseil trouvé.' })
  findOne(@Param('id') id: string) {
    return this.conseilsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un conseil' })
  @ApiResponse({ status: 200, description: 'Conseil mis à jour avec succès.' })
  update(@Param('id') id: string, @Body() updateConseilDto: UpdateConseilDto) {
    return this.conseilsService.update(id, updateConseilDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un conseil' })
  @ApiResponse({ status: 200, description: 'Conseil supprimé avec succès.' })
  remove(@Param('id') id: string) {
    return this.conseilsService.remove(id);
  }
}
