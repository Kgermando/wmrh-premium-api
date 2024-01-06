import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard'; 
import { HeuresSuppService } from './heures-supp.service';
import { HeureSuppCreateDto } from './models/heures-supp-create.dto';
import { HeureSuppUpdateDto } from './models/heures-supp-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('heures-supp')
export class HeuresSuppController {
    constructor(
        private heuresSuppService: HeuresSuppService
    ) {}

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.heuresSuppService.allGet(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.heuresSuppService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: HeureSuppCreateDto
    ) {
        return this.heuresSuppService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.heuresSuppService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: HeureSuppUpdateDto
    ) {
        const update_created = new Date();
        await this.heuresSuppService.update(id, {...body, update_created});  
        return this.heuresSuppService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.heuresSuppService.delete(id);
    }
}
