import { Module } from '@nestjs/common'; 
import { EmployesService } from './employes/employes.service';
import { EmployesController } from './employes/employes.controller';
import { FinancesController } from './finances/finances.controller';
import { FinancesService } from './finances/finances.service';
import { PresencesService } from './presences/presences.service';
import { PresencesController } from './presences/presences.controller';
import { RecrutementsAutresController } from './recrutements-autres/recrutements-autres.controller';
import { DashAllController } from './dash-all/dash-all.controller';
import DashAllService from './dash-all/dash-all.service';
import { RecrutementsAutresService } from './recrutements-autres/recrutements-autres.service';

@Module({
  providers: [EmployesService, FinancesService, PresencesService, DashAllService, RecrutementsAutresService],
  controllers: [EmployesController, FinancesController, PresencesController, RecrutementsAutresController, DashAllController]
})
export class DashboardModule {}
