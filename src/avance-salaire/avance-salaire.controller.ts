import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { AvanceSalaireService } from './avance-salaire.service';
import { AvanceSalaireCreateDto } from './models/avance-salaire-create.dto';
import { AvanceSalaireUpdateDto } from './models/avance-salaire-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('avance-salaires')
export class AvanceSalaireController {
    constructor(
        private avanceSalaireService: AvanceSalaireService
    ) {}

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.avanceSalaireService.allGet(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.avanceSalaireService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: AvanceSalaireCreateDto
    ) {
        return this.avanceSalaireService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.avanceSalaireService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: AvanceSalaireUpdateDto
    ) {
        const update_created = new Date();
        await this.avanceSalaireService.update(id, {...body, update_created});
        return this.avanceSalaireService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.avanceSalaireService.delete(id);
    }
}
