import { Module } from '@nestjs/common';
import { AvanceSalaireService } from './avance-salaire.service';
import { AvanceSalaireController } from './avance-salaire.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvanceSalaire } from './models/avance-salaire.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AvanceSalaire]),
    CommonModule,
  ],
  providers: [AvanceSalaireService],
  controllers: [AvanceSalaireController]
})
export class AvanceSalaireModule {}
