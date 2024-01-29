import { Controller, Get, Param } from '@nestjs/common';
import { EmployesService } from './employes.service';

@Controller('dashboard-employes')
export class EmployesController {
    constructor(
        private employesService: EmployesService
    ) {}

   
    @Get('enmployes-sexe-all/:code_entreprise')
    async getPieSexeAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.getPieSexeAll(code_entreprise);
    }


    @Get('enmployes-departement-all/:code_entreprise')
    async departementAll(
      @Param('code_entreprise') code_entreprise: string, 
    ) {
      return this.employesService.departementAll(code_entreprise);
    }

    @Get('enmployes-syndicat-all/:code_entreprise')
    async syndicatAll(
      @Param('code_entreprise') code_entreprise: string, 
    ) {
      return this.employesService.syndicatAll(code_entreprise);
    }

    @Get('enmployes-site-location-all/:code_entreprise')
    async siteLocationAll(
      @Param('code_entreprise') code_entreprise: string, 
    ) {
      return this.employesService.siteLocationAll(code_entreprise);
    }

    @Get('enmployes-compte-actif-all/:code_entreprise')
    async compteActifAll(
      @Param('code_entreprise') code_entreprise: string, 
    ) {
      return this.employesService.compteActifAll(code_entreprise);
    }


// Employés par departement, service, site de travail
    @Get('enmployes-dep-all/:code_entreprise')
    async employeDepartementAll(
      @Param('code_entreprise') code_entreprise: string, 
    ) {
      return this.employesService.employeDepartementAll(code_entreprise);
    }

    @Get('enmployes-service-all/:code_entreprise')
    async employeServiceAll(
      @Param('code_entreprise') code_entreprise: string, 
    ) {
      return this.employesService.employeServiceAll(code_entreprise);
    }

    @Get('enmployes-site-travail-all/:code_entreprise')
    async employeSiteLocationAll(
      @Param('code_entreprise') code_entreprise: string, 
    ) {
      return this.employesService.employeSiteLocationAll(code_entreprise);
    }


    // Age de contrat par employés
    @Get('enmployes-age-contrats-all/:code_entreprise')
    async ageContratEmployeAll(
      @Param('code_entreprise') code_entreprise: string, 
    ) {
      return this.employesService.ageContratEmployeAll(code_entreprise);
    }


    // Age des employés
    @Get('enmployes-age-employes-all/:code_entreprise')
    async ageEmployeAll(
      @Param('code_entreprise') code_entreprise: string, 
    ) {
      return this.employesService.ageEmployeAll(code_entreprise);
    }
}
