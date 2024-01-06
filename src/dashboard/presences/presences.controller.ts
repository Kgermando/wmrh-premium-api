import { Controller, Get, Param } from '@nestjs/common';
import { PresencesService } from './presences.service';

@Controller('dashboard-presences')
export class PresencesController {
    constructor(
        private presencesService: PresencesService
    ) {}


    @Get('pie-all/:code_entreprise/:start_date/:end_date')
    async getPieAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.presencesService.getPie(code_entreprise, start_date, end_date);
    }
 

    @Get('courbe-presences-all/:code_entreprise/:start_date/:end_date')
    async getCourbePresenceAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('start_date') start_date: string,
      @Param('end_date') end_date: string
    ) {
      return this.presencesService.getCourbePresenceAll(code_entreprise, start_date, end_date);
    }
}
