
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InputsService } from './inputs.service';
import { InputsController } from './inputs.controller';
import { Input, InputSchema } from './schemas/input.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Input.name, schema: InputSchema }]),
  ],
  controllers: [InputsController],
  providers: [InputsService],
  exports: [InputsService],
})
export class InputsModule {}
