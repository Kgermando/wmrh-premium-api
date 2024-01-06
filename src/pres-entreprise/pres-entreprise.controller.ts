import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard'; 
import { PresEntrepriseService } from './pres-entreprise.service';
import { PresEntrepriseCreateDto } from './models/pres-entreprise-create.dto';
import { PresEntrepriseUpdateDto } from './models/pres-entreprise-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('pres-entreprises')
export class PresEntrepriseController {
    constructor(
        private presEntrepriseService: PresEntrepriseService
    ) {}

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.presEntrepriseService.allGet(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.presEntrepriseService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: PresEntrepriseCreateDto
    ) {
        return this.presEntrepriseService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.presEntrepriseService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: PresEntrepriseUpdateDto
    ) {
        let update_created = new Date();
        await this.presEntrepriseService.update(id, {...body, update_created});
        return this.presEntrepriseService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.presEntrepriseService.delete(id);
    }
}
