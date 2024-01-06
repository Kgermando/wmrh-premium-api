import { Module } from '@nestjs/common';
import { PreferenceService } from './preference.service';
import { PreferenceController } from './preference.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Preference } from './models/preference.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Preference]),
    CommonModule,
  ],
  providers: [PreferenceService],
  controllers: [PreferenceController]
})
export class PreferenceModule {}
