import { Module } from '@nestjs/common';
import { DepartementController } from './departement.controller';
import { DepartementService } from './departement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departement } from './models/departement.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Departement]),
    CommonModule,
  ],
  controllers: [DepartementController],
  providers: [DepartementService]
})
export class DepartementModule {}
