
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConseilsService } from './conseils.service';
import { ConseilsController } from './conseils.controller';
import { Conseil, ConseilSchema } from './schemas/conseil.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Conseil.name, schema: ConseilSchema }]),
  ],
  controllers: [ConseilsController],
  providers: [ConseilsService],
  exports: [ConseilsService],
})
export class ConseilsModule {}
