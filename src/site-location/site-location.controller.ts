import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { SiteLocationService } from './site-location.service';
import { SiteLocationCreateDto } from './models/site-location-create.dto';
import { SiteLocationUpdateDto } from './models/site-location-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('site-locations')
export class SiteLocationController {
    constructor(
        private siteLocationService: SiteLocationService
    ) {}

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.siteLocationService.allGet(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.siteLocationService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: SiteLocationCreateDto
    ) {
        return this.siteLocationService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
      return this.siteLocationService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: SiteLocationUpdateDto
    ) {
        const update_created = new Date();
        await this.siteLocationService.update(id, {...body, update_created});   
        return this.siteLocationService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.siteLocationService.delete(id);
    }
}
