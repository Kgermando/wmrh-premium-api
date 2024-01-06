import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { PenaliteService } from './penalite.service';
import { PenaliteCreateDto } from './models/pernalite-create.dto';
import { PenaliteUpdateDto } from './models/pernalite-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('penalites')
export class PenaliteController {
    constructor(
        private penaliteService: PenaliteService
    ) {}

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.penaliteService.allGet(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.penaliteService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: PenaliteCreateDto
    ) {
        return this.penaliteService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.penaliteService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: PenaliteUpdateDto
    ) {
        const update_created = new Date();
        await this.penaliteService.update(id, {...body, update_created}); 
        return this.penaliteService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.penaliteService.delete(id);
    }
}
