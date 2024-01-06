import { Module } from '@nestjs/common';
import { PrimeService } from './prime.service';
import { PrimeController } from './prime.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Prime } from './models/prime.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prime]),
    CommonModule,
  ],
  providers: [PrimeService],
  controllers: [PrimeController]
})
export class PrimeModule {}
