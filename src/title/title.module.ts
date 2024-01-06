import { Module } from '@nestjs/common';
import { TitleService } from './title.service';
import { TitleController } from './title.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Title } from './models/title.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Title]),
    CommonModule,
  ],
  providers: [TitleService],
  controllers: [TitleController]
})
export class TitleModule {}
