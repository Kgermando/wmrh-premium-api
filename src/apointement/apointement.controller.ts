import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import type { Response } from 'express'; 
import * as bcrypt from 'bcrypt';
import * as Papa from 'papaparse';
import { ApointementService } from './apointement.service';
import { ApointementCreateDto } from './models/apointement-create.dto';
import { ApointementUpdateDto } from './models/apointement-update.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard)
@Controller('apointements')
export class ApointementController {
    constructor(
        private apointementService: ApointementService
    ) {}

    @Get('get-pie/:code_entreprise/:matricule')
    async getPie(
        @Param('code_entreprise') code_entreprise: string,
        @Param('matricule') matricule: string
    ) {
      return this.apointementService.getPie(code_entreprise, matricule);
    }

    @Get('get-pie-year/:code_entreprise/:matricule')
    async getPieYEAR(
        @Param('code_entreprise') code_entreprise: string,
        @Param('matricule') matricule: string
    ) {
      return this.apointementService.getPieYEAR(code_entreprise, matricule);
    }

    // ALL c'est pour le tableau de bord
    @Get('get-pie-all/:code_entreprise/:matricule')
    async getPieAll(
        @Param('code_entreprise') code_entreprise: string,
        @Param('matricule') matricule: string
    ) {
      return this.apointementService.getPieAll(code_entreprise, matricule);
    }

    @Get('get-matricule/:code_entreprise/:matricule')
    async getMatricule(
      @Param('code_entreprise') code_entreprise: string,
      @Param('matricule') matricule: string,
    ) {
      return this.apointementService.getMatricule(code_entreprise, matricule);
    }

    @Get('get-registre/:code_entreprise/:site_location/:date_presence') // Registre de presence par site de travail
    async getRegisterPresence(
      @Param('code_entreprise') code_entreprise: string,
      @Param('site_location') site_location: string,
      @Param('date_presence') date_presence: string,
    ) {
      return this.apointementService.registrePresence(code_entreprise, site_location, date_presence);
    }

    @Get('get-last-item/:code_entreprise/:matricule')
    async getLastItem(
      @Param('code_entreprise') code_entreprise: string,
      @Param('matricule') matricule: string,
    ) {
      return this.apointementService.getLastItem(code_entreprise, matricule);
    }

    // ALL c'est pour le tableau de bord
    @Get('get-item-p-a-aa/:code_entreprise')
    async getItemsPAAAALL(
      @Param('code_entreprise') code_entreprise: string
    ) {
      return this.apointementService.getItemsPAAAALL(code_entreprise);
    }

    @Get('get-item-p-a-aa/:code_entreprise/:site_location')
    async getItemsPAAA(
      @Param('code_entreprise') code_entreprise: string,
      @Param('site_location') site_location: string,
    ) {
      return this.apointementService.getItemsPAAA(code_entreprise, site_location);
    }

    // ALL c'est pour le tableau de bord
    @Get('get-item-conge/:code_entreprise')
    async getItemsCongEALL(
      @Param('code_entreprise') code_entreprise: string
    ) {
      return this.apointementService.getItemsCongEALL(code_entreprise);
    }

    @Get('get-item-conge/:code_entreprise/:site_location')
    async getItemsCongE(
      @Param('code_entreprise') code_entreprise: string,
      @Param('site_location') site_location: string,
    ) {
      return this.apointementService.getItemsCongE(code_entreprise, site_location);
    }


    @Post('download-xlsx/:code_entreprise/:site_location/:start_date/:end_date')
    async downloadReport(
      @Res() res: Response,
      @Param('code_entreprise') code_entreprise: string,
      @Param('site_location') site_location: string,
      @Param('start_date') start_date: Date,
      @Param('end_date') end_date: Date
    ) {
      let result = await this.apointementService.downloadExcel(code_entreprise, site_location, start_date, end_date);
        res.set("Content-Type", "text/xlsx");
      res.download(`${result}`);
    }


    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.apointementService.allGet(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.apointementService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: ApointementCreateDto
    ) {
        return this.apointementService.create(body);
    }


    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.apointementService.findGetOne({id});
    }
 
    
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: ApointementUpdateDto
    ) {
      const update_created = new Date();
        await this.apointementService.update(id, {...body, update_created}); 
        return this.apointementService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.apointementService.delete(id);
    }


    @Post('upload-csv')
    @UseInterceptors(FileInterceptor('file'))
    importEnergyConsuption(@UploadedFile() file) {
      try {
        let csv = file.buffer.toString();
        if (csv.charCodeAt(0) === 0xFEFF) {
          csv = csv.slice(1);
        }
        const entries = Papa.parse(csv, { header: true, delimiter: ';', dynamicTyping: true });
        entries.data.forEach(async element => {
          console.log("data csv", element);
          const personne = await this.apointementService.findOne({where: {matricule: element.matricule}});
          const personnel = personne.id;
          const created = new Date();
          const update_created = new Date();
          return this.apointementService.create({
            matricule: element.matricule,
            apointement: (element.apointement) ? element.apointement : 'P',
            prestation: (element.prestation) ? element.prestation : '1',
            observation: (element.observation) ? element.observation : 'Rien à signaler',
            date_entree: (element.date_entree) ? element.date_entree : new Date(),
            date_sortie: (element.date_sortie) ? element.date_sortie : new Date(),
            personnel: personnel,
            site_location: (element.site_location) ? element.site_location : '-',
            signature: (element.signature) ? element.signature : '-',
            created: created, 
            update_created : update_created, 
            entreprise: (element.entreprise) ? element.entreprise: '-',
            code_entreprise: (element.code_entreprise) ? element.code_entreprise: '-',
          });
            // return this.apointementService.create({
            //   ...element,
            //   created,
            //   update_created,
            //   personnel
            // });
        });
      } catch (error) {
        console.log('error', error);
      }
    }


    @Post('download-model-xlsx/:code_entreprise/:site_location')
    async downloadModelReport(
      @Res() res: Response,
      @Param('code_entreprise') code_entreprise: string,
      @Param('site_location') site_location: string,
      ) {
        let result = await this.apointementService.downloadModelExcel(code_entreprise, site_location);
          // console.log("result", result);  
          res.set("Content-Type", "text/xlsx");
        res.download(`${result}`);
    } 

}
