
import { IsString, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CoordinatesDto {
  @ApiProperty()
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @IsNumber()
  longitude: number;
}

export class CreateSurfaceDto {
  @ApiProperty({ description: 'Nom de la surface' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Taille en hectares' })
  @IsNumber()
  size: number;

  @ApiProperty({ description: 'Localisation' })
  @IsString()
  location: string;

  @ApiProperty({ description: 'Type de sol' })
  @IsString()
  soilType: string;

  @ApiPropertyOptional({ description: 'Description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Statut de la surface' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ description: 'Coordonnées GPS' })
  @ValidateNested()
  @Type(() => CoordinatesDto)
  @IsOptional()
  coordinates?: CoordinatesDto;

  @ApiPropertyOptional({ description: 'Notes additionnelles' })
  @IsString()
  @IsOptional()
  notes?: string;
}
