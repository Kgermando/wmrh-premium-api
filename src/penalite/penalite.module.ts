import { Module } from '@nestjs/common';
import { PenaliteService } from './penalite.service';
import { PenaliteController } from './penalite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Penalite } from './models/pernalite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Penalite]),
    CommonModule,
  ],
  providers: [PenaliteService],
  controllers: [PenaliteController]
})
export class PenaliteModule {}
