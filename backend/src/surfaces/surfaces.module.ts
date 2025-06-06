
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SurfacesService } from './surfaces.service';
import { SurfacesController } from './surfaces.controller';
import { Surface, SurfaceSchema } from './schemas/surface.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Surface.name, schema: SurfaceSchema }]),
  ],
  controllers: [SurfacesController],
  providers: [SurfacesService],
  exports: [SurfacesService],
})
export class SurfacesModule {}
