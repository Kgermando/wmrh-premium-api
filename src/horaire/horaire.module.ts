import { Module } from '@nestjs/common';
import { HoraireController } from './horaire.controller';
import { HoraireService } from './horaire.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Horaire } from './models/horaire.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Horaire]),
    CommonModule,
  ],
  controllers: [HoraireController],
  providers: [HoraireService]
})
export class HoraireModule {}
