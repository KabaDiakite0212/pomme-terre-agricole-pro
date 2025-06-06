
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
import { InputsService } from './inputs.service';
import { CreateInputDto } from './dto/create-input.dto';
import { UpdateInputDto } from './dto/update-input.dto';

@ApiTags('inputs')
@Controller('inputs')
export class InputsController {
  constructor(private readonly inputsService: InputsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel intrant' })
  @ApiResponse({ status: 201, description: 'Intrant créé avec succès' })
  create(@Body() createInputDto: CreateInputDto) {
    return this.inputsService.create(createInputDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les intrants' })
  @ApiResponse({ status: 200, description: 'Liste des intrants' })
  findAll() {
    return this.inputsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un intrant par ID' })
  @ApiResponse({ status: 200, description: 'Intrant trouvé' })
  @ApiResponse({ status: 404, description: 'Intrant non trouvé' })
  findOne(@Param('id') id: string) {
    return this.inputsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un intrant' })
  @ApiResponse({ status: 200, description: 'Intrant mis à jour' })
  @ApiResponse({ status: 404, description: 'Intrant non trouvé' })
  update(@Param('id') id: string, @Body() updateInputDto: UpdateInputDto) {
    return this.inputsService.update(id, updateInputDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un intrant' })
  @ApiResponse({ status: 200, description: 'Intrant supprimé' })
  @ApiResponse({ status: 404, description: 'Intrant non trouvé' })
  remove(@Param('id') id: string) {
    return this.inputsService.remove(id);
  }
}
