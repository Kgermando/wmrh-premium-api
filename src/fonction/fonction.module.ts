import { Module } from '@nestjs/common';
import { FonctionService } from './fonction.service';
import { FonctionController } from './fonction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Fonction } from './models/fonction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fonction]),
    CommonModule,
  ],
  providers: [FonctionService],
  controllers: [FonctionController]
})
export class FonctionModule {}
