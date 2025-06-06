
import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInputDto {
  @ApiProperty({ description: 'Nom de l\'intrant' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Type d\'intrant' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Quantité' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Unité de mesure' })
  @IsString()
  unit: string;

  @ApiProperty({ description: 'Prix unitaire' })
  @IsNumber()
  unitPrice: number;

  @ApiProperty({ description: 'Fournisseur' })
  @IsString()
  supplier: string;

  @ApiProperty({ description: 'Date d\'achat' })
  @IsDateString()
  purchaseDate: string;

  @ApiPropertyOptional({ description: 'Date d\'expiration' })
  @IsDateString()
  @IsOptional()
  expiryDate?: string;

  @ApiPropertyOptional({ description: 'Statut de l\'intrant' })
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
