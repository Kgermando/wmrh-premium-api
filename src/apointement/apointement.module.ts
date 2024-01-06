import { Module } from '@nestjs/common';
import { ApointementService } from './apointement.service';
import { ApointementController } from './apointement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Apointement } from './models/apointement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Apointement]),
    CommonModule,
  ],
  providers: [ApointementService],
  controllers: [ApointementController]
})
export class ApointementModule {}
