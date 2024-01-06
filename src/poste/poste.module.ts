import { Module } from '@nestjs/common';
import { PosteService } from './poste.service';
import { PosteController } from './poste.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Poste } from './models/poste.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Poste]),
    CommonModule,
  ],
  providers: [PosteService],
  controllers: [PosteController]
})
export class PosteModule {}
