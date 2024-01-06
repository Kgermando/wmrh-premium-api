import { Module } from '@nestjs/common';
import { PerformenceController } from './performence.controller';
import { PerformenceService } from './performence.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Performence } from './models/performence.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Performence]),
    CommonModule,
  ],
  providers: [PerformenceService],
  controllers: [PerformenceController]
})
export class PerformenceModule {}
