import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard'; 
import { HoraireService } from './horaire.service';
import { HoraireUpdateDto } from './models/horaire-update.dto';
import { HoraireCreateDto } from './models/horaire-create.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('horaires')
export class HoraireController {
    constructor(
        private horaireService: HoraireService
    ) {}

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.horaireService.allGet(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.horaireService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: HoraireCreateDto
    ) {
        return this.horaireService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.horaireService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: HoraireUpdateDto
    ) {
        const update_created = new Date();
        await this.horaireService.update(id, {...body, update_created});  
        return this.horaireService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.horaireService.delete(id);
    }
}
