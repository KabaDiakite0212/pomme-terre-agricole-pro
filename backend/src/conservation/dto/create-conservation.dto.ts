
import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConservationDto {
  @ApiProperty({ description: 'Type de conservation (case, tapis, ligne)' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Nom de l\'élément' })
  @IsString()
  nom: string;

  @ApiProperty({ description: 'ID du parent', required: false })
  @IsOptional()
  @IsString()
  parentId?: string;

  @ApiProperty({ description: 'Capacité maximale', required: false })
  @IsOptional()
  @IsNumber()
  capaciteMax?: number;

  @ApiProperty({ description: 'Description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Température', required: false })
  @IsOptional()
  @IsNumber()
  temperature?: number;

  @ApiProperty({ description: 'Humidité', required: false })
  @IsOptional()
  @IsNumber()
  humidite?: number;

  @ApiProperty({ description: 'ID de la récolte assignée', required: false })
  @IsOptional()
  @IsString()
  recolteId?: string;

  @ApiProperty({ description: 'Date d\'assignation', required: false })
  @IsOptional()
  @IsDateString()
  dateAssignation?: Date;

  @ApiProperty({ description: 'Notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
