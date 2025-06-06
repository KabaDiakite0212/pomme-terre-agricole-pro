
import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEquipmentDto {
  @ApiProperty({ description: 'Nom de l\'équipement' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Type d\'équipement' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Marque' })
  @IsString()
  brand: string;

  @ApiProperty({ description: 'Modèle' })
  @IsString()
  model: string;

  @ApiProperty({ description: 'Date d\'achat' })
  @IsDateString()
  purchaseDate: string;

  @ApiProperty({ description: 'Prix d\'achat' })
  @IsNumber()
  purchasePrice: number;

  @ApiPropertyOptional({ description: 'Statut de l\'équipement' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ description: 'Date de dernière maintenance' })
  @IsDateString()
  @IsOptional()
  lastMaintenance?: string;

  @ApiPropertyOptional({ description: 'Date de prochaine maintenance' })
  @IsDateString()
  @IsOptional()
  nextMaintenance?: string;

  @ApiPropertyOptional({ description: 'Notes additionnelles' })
  @IsString()
  @IsOptional()
  notes?: string;
}
