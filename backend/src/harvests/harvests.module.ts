
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HarvestsService } from './harvests.service';
import { HarvestsController } from './harvests.controller';
import { Harvest, HarvestSchema } from './schemas/harvest.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Harvest.name, schema: HarvestSchema }]),
  ],
  controllers: [HarvestsController],
  providers: [HarvestsService],
  exports: [HarvestsService],
})
export class HarvestsModule {}
