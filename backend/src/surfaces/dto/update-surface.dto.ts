
import { PartialType } from '@nestjs/swagger';
import { CreateSurfaceDto } from './create-surface.dto';

export class UpdateSurfaceDto extends PartialType(CreateSurfaceDto) {}
