import { Module } from '@nestjs/common';
import { PresEntrepriseService } from './pres-entreprise.service';
import { PresEntrepriseController } from './pres-entreprise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { PresEntreprise } from './models/pres-entreprise.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PresEntreprise]),
    CommonModule,
  ],
  providers: [PresEntrepriseService],
  controllers: [PresEntrepriseController]
})
export class PresEntrepriseModule {}
