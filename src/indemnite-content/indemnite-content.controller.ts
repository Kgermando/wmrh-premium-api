import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { IndemniteContentCreateDto } from './models/indemnite-content-create.dto';
import { IndemniteContentUpdateDto } from './models/indemnite-content-update.dto';
import { IndemniteContentService } from './indemnite-content.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('indemnite-contents')
export class IndemniteContentController {
    constructor(
        private indemniteContentService: IndemniteContentService
    ) {}

    @Get('get-all-id/:id')
    async findGetAll(
      @Param('id') id: number,
    ) {
      return this.indemniteContentService.findGetAll(id);
    }

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.indemniteContentService.allGet(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.indemniteContentService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: IndemniteContentCreateDto
    ) {
        return this.indemniteContentService.create(body);
    }


    @Get('get/:id')
    async get(@Param('id') id: number) {
      return this.indemniteContentService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: IndemniteContentUpdateDto
    ) {
        const update_created = new Date();
        await this.indemniteContentService.update(id, {...body, update_created});   
        return this.indemniteContentService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.indemniteContentService.delete(id);
    }
}