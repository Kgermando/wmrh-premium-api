import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { PerformenceService } from './performence.service';
import { PerformenceCreateDto } from './models/performence-create.dto';
import { PerformenceUpdateDto } from './models/performence-update.dto';

@UseGuards(AuthGuard)
@Controller('performences')
export class PerformenceController {
    constructor(
        private performenceService: PerformenceService
    ) {}

    @Get('get-pie-year/:code_entreprise/:id')
    async getPieYEAR(
        @Param('code_entreprise') code_entreprise: string,
        @Param('id') id: number
    ) {
      return this.performenceService.getPieYEAR(code_entreprise, id);
    }

    @Get('get-pie-all/:code_entreprise/:id')
    async getPieAll(
        @Param('code_entreprise') code_entreprise: string,
        @Param('id') id: number
    ) {
      return this.performenceService.getPieAll(code_entreprise, id);
    }

    @Get('get-ponctualite-total-year/:code_entreprise/:id')
    async ponctualiteTotalYEAR(
      @Param('code_entreprise') code_entreprise: string,
      @Param('id') id: number
    ) {
      return this.performenceService.ponctualiteTotalYEAR(code_entreprise, id);
    }

    @Get('get-hospitalite-total-year/:code_entreprise/:id')
    async hospitaliteTotalYEAR(
      @Param('code_entreprise') code_entreprise: string,
      @Param('id') id: number
    ) {
      return this.performenceService.hospitaliteTotalYEAR(code_entreprise, id);
    }

    @Get('get-travail-total-year/:code_entreprise/:id')
    async travailTotalYEAR(
      @Param('code_entreprise') code_entreprise: string,
      @Param('id') id: number
    ) {
      return this.performenceService.travailTotalYEAR(code_entreprise, id);
    }

    @Get('get-ponctualite-total-all/:code_entreprise/:id')
    async ponctualiteTotalALL(
      @Param('code_entreprise') code_entreprise: string,
      @Param('id') id: number
    ) {
      return this.performenceService.ponctualiteTotalALL(code_entreprise, id);
    }

    @Get('get-hospitalite-total-all/:code_entreprise/:id')
    async hospitaliteTotalALL(
      @Param('code_entreprise') code_entreprise: string,
      @Param('id') id: number
    ) {
      return this.performenceService.hospitaliteTotalALL(code_entreprise, id);
    }

    @Get('get-travail-total-all/:code_entreprise/:id')
    async travailTotalALL(
      @Param('code_entreprise') code_entreprise: string,
      @Param('id') id: number
    ) {
      return this.performenceService.travailTotalALL(code_entreprise, id);
    }

    @Get('get-ponctualite-total/:code_entreprise/:id')
    async ponctualiteTotal(
      @Param('code_entreprise') code_entreprise: string,
      @Param('id') id: number
    ) {
      return this.performenceService.ponctualiteTotal(code_entreprise, id);
    }

    @Get('get-hospitalite-total/:code_entreprise/:id')
    async hospitaliteTotal(
      @Param('code_entreprise') code_entreprise: string,
      @Param('id') id: number
    ) {
      return this.performenceService.hospitaliteTotal(code_entreprise, id);
    }

    @Get('get-travail-total/:code_entreprise/:id')
    async travailTotal(
      @Param('code_entreprise') code_entreprise: string,
      @Param('id') id: number
    ) {
      return this.performenceService.travailTotal(code_entreprise, id);
    }

    @Get('get-cumul-total/:code_entreprise/:id')
    async cumulTotal(
      @Param('code_entreprise') code_entreprise: string,
      @Param('id') id: number
    ) {
      return this.performenceService.cumulTotal(code_entreprise, id);
    }

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.performenceService.allGet(code_entreprise);
    }


    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.performenceService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: PerformenceCreateDto
    ) {
        return this.performenceService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.performenceService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: PerformenceUpdateDto
    ) {
      const update_created = new Date();
      await this.performenceService.update(id, {...body, update_created});
      return this.performenceService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.performenceService.delete(id);
    }
}

