import { Module } from '@nestjs/common';
import { AbonnementClientController } from './abonnement_client.controller';
import { AbonnementClientService } from './abonnement_client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { AbonnementClient } from './models/abonnement_client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AbonnementClient]),
    CommonModule,
  ],
  controllers: [AbonnementClientController],
  providers: [AbonnementClientService]
})
export class AbonnementClientModule {}
