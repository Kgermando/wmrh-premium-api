import { Module } from '@nestjs/common';
import { CandidatureService } from './candidature.service';
import { CandidatureController } from './candidature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Candidature } from './models/candidature.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidature]),
    CommonModule,
  ],
  providers: [CandidatureService],
  controllers: [CandidatureController]
})
export class CandidatureModule {}
