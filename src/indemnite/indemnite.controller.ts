import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { IndemniteService } from './indemnite.service';
import { IndemniteUpdateDto } from './models/indemnite-update.dto';
import { IndemniteCreateDto } from './models/indemnite-create.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('indemnites')
export class IndemniteController {
    constructor(
        private indemniteService: IndemniteService
    ) {}

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.indemniteService.allGet(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.indemniteService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: IndemniteCreateDto
    ) {
        return this.indemniteService.create(body);
    }


    @Get('get/:id')
    async get(@Param('id') id: number) {
      return this.indemniteService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: IndemniteUpdateDto
    ) {
        const update_created = new Date();
        await this.indemniteService.update(id, {...body, update_created});   
        return this.indemniteService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.indemniteService.delete(id);
    }
}