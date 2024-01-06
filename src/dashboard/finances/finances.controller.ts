import { Controller, Get, Param } from '@nestjs/common';
import { FinancesService } from './finances.service';

@Controller('dashboard-finances')
export class FinancesController {
    constructor(
        private financesService: FinancesService
    ) {}

    
    @Get('total-ipr-all/:code_entreprise/:start_date/:end_date')
    async iprAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.financesService.iprAll(code_entreprise, start_date, end_date);
    }

    @Get('total-cnss-qpo-all/:code_entreprise/:start_date/:end_date')
    async cnssQPOAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.financesService.cnssQPOAll(code_entreprise, start_date, end_date);
    }

    @Get('total-rbi-all/:code_entreprise/:start_date/:end_date')
    async totalRBIAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.financesService.totalRBIAll(code_entreprise, start_date, end_date);
    }



    // Depenses 
    @Get('total-depenses-paye-all/:code_entreprise/:start_date/:end_date')
    async depensePayEALl(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.financesService.depensePayEALl(code_entreprise, start_date, end_date);
    }

}
