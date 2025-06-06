
import { IsString, IsNumber, IsDateString, IsOptional, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class LocationDto {
  @ApiProperty()
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @IsNumber()
  longitude: number;
}

export class CreateFieldDto {
  @ApiProperty({ description: 'Nom du champ' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'ID de la surface' })
  @IsString()
  surfaceId: string;

  @ApiProperty({ description: 'Taille en hectares' })
  @IsNumber()
  size: number;

  @ApiProperty({ description: 'Variété cultivée' })
  @IsString()
  variety: string;

  @ApiProperty({ description: 'Date de plantation' })
  @IsDateString()
  plantingDate: string;

  @ApiPropertyOptional({ description: 'Date de récolte prévue' })
  @IsDateString()
  @IsOptional()
  harvestDate?: string;

  @ApiPropertyOptional({ description: 'Statut du champ' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ description: 'Progression en pourcentage' })
  @IsNumber()
  @IsOptional()
  progress?: number;

  @ApiPropertyOptional({ description: 'Notes additionnelles' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({ description: 'Localisation GPS' })
  @ValidateNested()
  @Type(() => LocationDto)
  @IsOptional()
  location?: LocationDto;
}
