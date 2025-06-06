
import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ description: 'Nom du client' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email du client' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Téléphone du client' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Adresse du client' })
  @IsString()
  address: string;

  @ApiPropertyOptional({ description: 'Statut du client' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ description: 'Notes additionnelles' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({ description: 'Total des achats' })
  @IsNumber()
  @IsOptional()
  totalPurchases?: number;

  @ApiPropertyOptional({ description: 'Montant total' })
  @IsNumber()
  @IsOptional()
  totalAmount?: number;
}
