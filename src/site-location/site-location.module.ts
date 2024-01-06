import { Module } from '@nestjs/common';
import { SiteLocationController } from './site-location.controller';
import { SiteLocationService } from './site-location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { SiteLocation } from './models/site-location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SiteLocation]),
    CommonModule,
  ],
  controllers: [SiteLocationController],
  providers: [SiteLocationService]
})
export class SiteLocationModule {}
