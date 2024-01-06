import { Module } from '@nestjs/common';
import { IndemniteController } from './indemnite.controller';
import { IndemniteService } from './indemnite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Indemnite } from './models/indemnite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Indemnite]),
    CommonModule,
  ],
  controllers: [IndemniteController],
  providers: [IndemniteService]
})
export class IndemniteModule {}