import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { TitleService } from './title.service';
import { TitleCreateDto } from './models/title-create.dto';
import { TitleUpdateDto } from './models/title-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('titles')
export class TitleController {
    constructor(
        private titleService: TitleService
    ) {}

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.titleService.allGet(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.titleService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: TitleCreateDto
    ) {
        return this.titleService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
      return this.titleService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: TitleUpdateDto
    ) {
        const update_created = new Date();
        await this.titleService.update(id, {...body, update_created});  
        return this.titleService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.titleService.delete(id);
    }
}
