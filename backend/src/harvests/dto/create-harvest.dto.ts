
import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHarvestDto {
  @ApiProperty({ description: 'ID du champ' })
  @IsString()
  fieldId: string;

  @ApiProperty({ description: 'Nom du champ' })
  @IsString()
  fieldName: string;

  @ApiProperty({ description: 'Variété récoltée' })
  @IsString()
  variety: string;

  @ApiProperty({ description: 'Quantité récoltée en kg' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Prix unitaire par kg' })
  @IsNumber()
  unitPrice: number;

  @ApiProperty({ description: 'Date de récolte' })
  @IsDateString()
  harvestDate: string;

  @ApiProperty({ description: 'Lieu de stockage' })
  @IsString()
  storage: string;

  @ApiPropertyOptional({ description: 'Statut de la récolte' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ description: 'Quantité en stock' })
  @IsNumber()
  @IsOptional()
  inStock?: number;

  @ApiPropertyOptional({ description: 'Notes additionnelles' })
  @IsString()
  @IsOptional()
  notes?: string;
}
