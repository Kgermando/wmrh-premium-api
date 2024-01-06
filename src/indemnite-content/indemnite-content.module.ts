import { Module } from '@nestjs/common';
import { IndemniteContentController } from './indemnite-content.controller';
import { IndemniteContentService } from './indemnite-content.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { IndemniteContent } from './models/indemnite-content.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([IndemniteContent]),
    CommonModule,
  ],
  controllers: [IndemniteContentController],
  providers: [IndemniteContentService]
})
export class IndemniteContentModule {}