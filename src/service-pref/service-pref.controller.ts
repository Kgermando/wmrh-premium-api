import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { ServicePrefService } from './service-pref.service';
import { ServicePrefCreateDto } from './models/service-pref-create.dto';
import { ServicePrefUpdateDto } from './models/service-pref-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('service-prefs')
export class ServicePrefController {
    constructor(
        private servicePrefService: ServicePrefService,
    ) {}

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.servicePrefService.allGet(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.servicePrefService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: ServicePrefCreateDto
    ) {
        return this.servicePrefService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
      return this.servicePrefService.findGetOne({id}); 
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: ServicePrefUpdateDto
    ) {
        const update_created = new Date();
        await this.servicePrefService.update(id, {...body, update_created});    
        return this.servicePrefService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.servicePrefService.delete(id);
    }
}
