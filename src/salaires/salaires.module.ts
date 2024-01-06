import { Module, forwardRef } from '@nestjs/common';
import { SalairesService } from './salaires.service';
import { SalairesController } from './salaires.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Salaire } from './models/salaire.entity';
import { PersonnelModule } from 'src/personnel/personnel.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Salaire]),
    forwardRef(() => PersonnelModule),
    CommonModule,
  ],
  providers: [SalairesService],
  controllers: [SalairesController],
  exports: [SalairesService]
})
export class SalairesModule {}
