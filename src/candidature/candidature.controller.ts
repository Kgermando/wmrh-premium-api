import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { CandidatureService } from './candidature.service';
import { CandidatureCreateDto } from './models/candidature-create.dto';
import { CandidatureUpdateDto } from './models/candidature-update.dto';

@UseGuards(AuthGuard)
@Controller('candidatures')
export class CandidatureController {
    constructor(
        private candidatureService: CandidatureService
    ) {}

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.candidatureService.all(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,  
        @Param('code_entreprise') code_entreprise: string) {
        return this.candidatureService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: CandidatureCreateDto
    ) {
        return this.candidatureService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.candidatureService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: CandidatureUpdateDto
    ) {
        const update_created = new Date();
        await this.candidatureService.update(id, {...body, update_created}); 
        return this.candidatureService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.candidatureService.delete(id);
    }
}
