import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { DepartementService } from './departement.service'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { DepartementCreateDto } from './models/departement.create.dto';
import { DepartementUpdateDto } from './models/departement.update.dto';


@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('departements')
export class DepartementController {
    constructor(
        private departementService: DepartementService
    ) {}

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.departementService.allGet(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.departementService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: DepartementCreateDto
    ) {
        return this.departementService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
      return this.departementService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: DepartementUpdateDto
    ) {
        const update_created = new Date();
        await this.departementService.update(id, {...body, update_created}); 
        return this.departementService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.departementService.delete(id);
    }
} 
