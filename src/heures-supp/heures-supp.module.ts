import { Module } from '@nestjs/common';
import { HeuresSuppService } from './heures-supp.service';
import { HeuresSuppController } from './heures-supp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { HeureSupp } from './models/heures-supp.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HeureSupp]),
    CommonModule,
  ],
  providers: [HeuresSuppService],
  controllers: [HeuresSuppController]
})
export class HeuresSuppModule {}
