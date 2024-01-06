import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { NotifyService } from './notify.service';
import { NotifyCreateDto } from './models/notify-create.dto';
import { NotifyUpdateDto } from './models/notify-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('notify')
export class NotifyController {
    constructor(
        private notifyService: NotifyService
    ) {}

    @Get('get-all/:code_entreprise/:matricule')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
      @Param('matricule') matricule: string,
    ) {
      return this.notifyService.allGet(code_entreprise, matricule);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.notifyService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: NotifyCreateDto
    ) {
        return this.notifyService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.notifyService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: NotifyUpdateDto
    ) {
        const update_created = new Date();
        await this.notifyService.update(id, {...body, update_created}); 
        return this.notifyService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.notifyService.delete(id);
    }
}
