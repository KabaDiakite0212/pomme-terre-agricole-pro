
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FieldsModule } from './fields/fields.module';
import { HarvestsModule } from './harvests/harvests.module';
import { SalesModule } from './sales/sales.module';
import { ClientsModule } from './clients/clients.module';
import { EquipmentModule } from './equipment/equipment.module';
import { InputsModule } from './inputs/inputs.module';
import { SurfacesModule } from './surfaces/surfaces.module';
import { ConservationModule } from './conservation/conservation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/farm-management'
    ),
    FieldsModule,
    HarvestsModule,
    SalesModule,
    ClientsModule,
    EquipmentModule,
    InputsModule,
    SurfacesModule,
    ConservationModule,
  ],
})
export class AppModule {}
