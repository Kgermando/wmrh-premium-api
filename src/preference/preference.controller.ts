import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { PreferenceService } from './preference.service';
import { PreferenceCreateDto } from './models/preference-create.dto';
import { PreferenceUpdateDto } from './models/preference-update.dto';

@UseGuards(AuthGuard)
@Controller('preferences')
export class PreferenceController {
    constructor(
        private preferenceService: PreferenceService
    ) {}

    @Get('preference/:code_entreprise')
    async preference(@Param('code_entreprise') code_entreprise: string) { 
        return this.preferenceService.preference({code_entreprise});
    }


    @Post()
    async create(
        @Body() body: PreferenceCreateDto
    ) {
        return this.preferenceService.create(body);
    }

 
    @Put(':code_entreprise/:signature')
    async update(
        @Param('code_entreprise') code_entreprise: string,
        @Param('signature') signature: string,
        @Body() body: PreferenceUpdateDto
    ) { 
        const update_created = new Date(); 
        await this.preferenceService.updatePref({code_entreprise}, {...body, signature, update_created});
        return this.preferenceService.preference({code_entreprise}); 
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.preferenceService.delete(id);
    }


    @Get('get-all')
    async getAll() {
      return this.preferenceService.all();
    }

  

}
