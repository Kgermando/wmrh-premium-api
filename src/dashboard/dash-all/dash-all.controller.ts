import { Controller, Get, Param } from '@nestjs/common';
import DashAllService from './dash-all.service';

@Controller('dash-all')
export class DashAllController {
    constructor(
        private dashAllService: DashAllService
    ) {}

    @Get('total-enmployes-all/:code_entreprise')
    async totalEnmployesAll(
      @Param('code_entreprise') code_entreprise: string
    ) {
      return this.dashAllService.totalEnmployesAll(code_entreprise);
    }

    @Get('total-enmployes-femme-all/:code_entreprise')
    async totalEnmployeFemmeAll(
      @Param('code_entreprise') code_entreprise: string
    ) {
      return this.dashAllService.totalEnmployeFemmeAll(code_entreprise);
    }

    @Get('total-enmployes-homme-all/:code_entreprise')
    async totalEnmployeHommeAll(
      @Param('code_entreprise') code_entreprise: string
    ) {
      return this.dashAllService.totalEnmployeHommeAll(code_entreprise);
    }



    // Performences Employés
    @Get('performences-all/:code_entreprise/:start_date/:end_date')
    async getPerformencesAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
        return this.dashAllService.getPerformencesAll(code_entreprise, start_date, end_date);
    }


    // Finances Net à payer
  
    @Get('masse-salarial-all/:code_entreprise/:start_date/:end_date')
    async masseSalarialAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.dashAllService.masseSalarialAll(code_entreprise, start_date, end_date);
    }

    // Statut de paie disponible et traitements

    @Get('statut-paie-all/:code_entreprise/:start_date/:end_date')
    async statutPaieAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.dashAllService.statutPaieAll(code_entreprise, start_date, end_date);
    }

 // Alocations logement, transport, famillial, soins medicaux

    @Get('allocation-all/:code_entreprise/:start_date/:end_date')
    async allocationALl(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.dashAllService.allocationALl(code_entreprise, start_date, end_date);
    }


  // Chiffres 
    @Get('primes-all/:code_entreprise/:start_date/:end_date')
    async primesAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.dashAllService.primesAll(code_entreprise, start_date, end_date);
    }
    @Get('primes-anciennete-all/:code_entreprise/:start_date/:end_date')
    async primeAncienneteAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.dashAllService.primeAncienneteAll(code_entreprise, start_date, end_date);
    }

    @Get('penalites-all/:code_entreprise/:start_date/:end_date')
    async penaliteAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.dashAllService.penaliteAll(code_entreprise, start_date, end_date);
    }


    @Get('avances-salaires-all/:code_entreprise/:start_date/:end_date')
    async avanceSalaireAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.dashAllService.avanceSalaireAll(code_entreprise, start_date, end_date);
    }

    @Get('pres-entreprise-all/:code_entreprise/:start_date/:end_date')
    async presEntrepriseAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.dashAllService.presEntrepriseAll(code_entreprise, start_date, end_date);
    }

    @Get('heures-supp-all/:code_entreprise/:start_date/:end_date')
    async heureSuppAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.dashAllService.heureSuppAll(code_entreprise, start_date, end_date);
    } 

    @Get('syndicats-all/:code_entreprise/:start_date/:end_date')
    async syndicatAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.dashAllService.syndicatAll(code_entreprise, start_date, end_date);
    } 


// Presences 
    @Get('presence-all/:code_entreprise/:start_date/:end_date')
    async presencePieAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.dashAllService.presencePieAll(code_entreprise, start_date, end_date);
    }

    
    // Recrutements
 
    @Get('recrutements-total-all/:code_entreprise/:start_date/:end_date')
    async recrutementsTotalAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.dashAllService.recrutementsTotalAll(code_entreprise, start_date, end_date);
    }
 
    @Get('postulants-total-all/:code_entreprise/:start_date/:end_date')
    async postulantsTotalAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.dashAllService.postulantsTotalAll(code_entreprise, start_date, end_date);
    } 

    @Get('postulants-retenus-total-all/:code_entreprise/:start_date/:end_date')
    async postulantsRetenuTotalAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.dashAllService.postulantsRetenuTotalAll(code_entreprise, start_date, end_date);
    }
}
