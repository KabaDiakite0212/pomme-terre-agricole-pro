
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConservationService } from './conservation.service';
import { ConservationController } from './conservation.controller';
import { Conservation, ConservationSchema } from './schemas/conservation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Conservation.name, schema: ConservationSchema }]),
  ],
  controllers: [ConservationController],
  providers: [ConservationService],
  exports: [ConservationService],
})
export class ConservationModule {}
