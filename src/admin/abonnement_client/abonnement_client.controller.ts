import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { AbonnementClientService } from './abonnement_client.service';
import { AbonnementClientCreateDto } from './models/abonnement_client-create.dto';
import { AbonnementClientUpdateDto } from './models/abonnement_client-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('abonnements-clients')
export class AbonnementClientController {
    constructor(
        private abonnementClientService: AbonnementClientService
    ) {}

    @Get('get-all')
    async getAll() {
      return this.abonnementClientService.allGet();
    }
 
    @Post()
    async create(
        @Body() body: AbonnementClientCreateDto
    ) {
        return this.abonnementClientService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.abonnementClientService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: AbonnementClientUpdateDto
    ) {
        const update_created = new Date();
        await this.abonnementClientService.update(id, {...body, update_created});
        return this.abonnementClientService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.abonnementClientService.delete(id);
    }
}
