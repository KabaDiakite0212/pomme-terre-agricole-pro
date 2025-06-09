
import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConseilDto {
  @ApiProperty({ description: 'Titre du conseil' })
  @IsString()
  titre: string;

  @ApiProperty({ description: 'Contenu du conseil' })
  @IsString()
  contenu: string;

  @ApiProperty({ description: 'Auteur du conseil' })
  @IsString()
  auteur: string;

  @ApiProperty({ description: 'Catégorie du conseil', required: false })
  @IsOptional()
  @IsString()
  categorie?: string;

  @ApiProperty({ description: 'Tags associés au conseil', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
