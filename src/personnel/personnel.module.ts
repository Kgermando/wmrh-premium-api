import { Module, forwardRef } from '@nestjs/common';
import { PersonnelController } from './personnel.controller';
import { PersonnelService } from './personnel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';
import { Personnel } from './models/personnel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Personnel]), 
    forwardRef(() => AuthModule),
    CommonModule,
  ],
  controllers: [PersonnelController],
  providers: [PersonnelService],
  exports: [PersonnelService]
})
export class PersonnelModule {}
