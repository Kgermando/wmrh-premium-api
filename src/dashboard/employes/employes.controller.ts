import { Controller, Get, Param } from '@nestjs/common';
import { EmployesService } from './employes.service';

@Controller('dashboard-employes')
export class EmployesController {
    constructor(
        private employesService: EmployesService
    ) {}

   
    @Get('enmployes-sexe-all/:code_entreprise/:start_date/:end_date')
    async getPieSexeAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.employesService.getPieSexeAll(code_entreprise, start_date, end_date);
    }


    @Get('enmployes-departement-all/:code_entreprise/:start_date/:end_date')
    async departementAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.employesService.departementAll(code_entreprise, start_date, end_date);
    }

    @Get('enmployes-syndicat-all/:code_entreprise/:start_date/:end_date')
    async syndicatAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.employesService.syndicatAll(code_entreprise, start_date, end_date);
    }

    @Get('enmployes-site-location-all/:code_entreprise/:start_date/:end_date')
    async siteLocationAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.employesService.siteLocationAll(code_entreprise, start_date, end_date);
    }

    @Get('enmployes-compte-actif-all/:code_entreprise/:start_date/:end_date')
    async compteActifAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.employesService.compteActifAll(code_entreprise, start_date, end_date);
    }


// Employés par departement, service, site de travail
    @Get('enmployes-dep-all/:code_entreprise/:start_date/:end_date')
    async employeDepartementAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.employesService.employeDepartementAll(code_entreprise, start_date, end_date);
    }

    @Get('enmployes-service-all/:code_entreprise/:start_date/:end_date')
    async employeServiceAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.employesService.employeServiceAll(code_entreprise, start_date, end_date);
    }

    @Get('enmployes-site-travail-all/:code_entreprise/:start_date/:end_date')
    async employeSiteLocationAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.employesService.employeSiteLocationAll(code_entreprise, start_date, end_date);
    }


    // Age de contrat par employés
    

    @Get('enmployes-age-contrats-all/:code_entreprise/:start_date/:end_date')
    async ageContratEmployeAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.employesService.ageContratEmployeAll(code_entreprise, start_date, end_date);
    }


    // Age des employés
    @Get('enmployes-age-employes-all/:code_entreprise/:start_date/:end_date')
    async ageEmployeAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.employesService.ageEmployeAll(code_entreprise, start_date, end_date);
    }
}
