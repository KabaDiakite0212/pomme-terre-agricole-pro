
import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSaleDto {
  @ApiPropertyOptional({ description: 'ID de la récolte (si vente depuis récolte)' })
  @IsString()
  @IsOptional()
  harvestId?: string;

  @ApiProperty({ description: 'Nom du client' })
  @IsString()
  clientName: string;

  @ApiProperty({ description: 'Produit vendu' })
  @IsString()
  product: string;

  @ApiProperty({ description: 'Quantité vendue en kg' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Prix unitaire par kg' })
  @IsNumber()
  unitPrice: number;

  @ApiProperty({ description: 'Montant total' })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({ description: 'Mode de paiement' })
  @IsString()
  paymentMethod: string;

  @ApiProperty({ description: 'Date de vente' })
  @IsDateString()
  saleDate: string;

  @ApiPropertyOptional({ description: 'Statut de la vente' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ description: 'Notes additionnelles' })
  @IsString()
  @IsOptional()
  notes?: string;
}
