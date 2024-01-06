import { BadRequestException, Body, ClassSerializerInterceptor, 
    Controller, Delete, Get, Param, Post, Put, Query, Req, 
    UploadedFile, UseGuards, UseInterceptors, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';  
import * as Papa from 'papaparse';
import { AuthGuard } from 'src/auth/auth.guard'; 
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express'; 
import { PersonnelService } from './personnel.service';
import { Personnel } from './models/personnel.entity';
import { PersonnelCreateDto } from './models/personnel-create.dto';
import { PersonnelUpdateDto } from './models/personnel-update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('personnels')
export class PersonnelController {

  constructor(
    private personneService: PersonnelService,
    private authService: AuthService,
  ) {}
  
  @Get('get-all-support')
  async getWithSupport() {
    return this.personneService.getWithSupport();
  }

  @Get('get-all/:code_entreprise')
  async getAll(
    @Param('code_entreprise') code_entreprise: string,
  ) {
    return this.personneService.allGet(code_entreprise);
  }

  @Get('get-all-performance/:code_entreprise')
  async getAllPerformance(
    @Param('code_entreprise') code_entreprise: string,
  ) {
    return this.personneService.getAllPerformance(code_entreprise);
  }

  @Get('get-all/:code_entreprise/:site_locations')
  async getAllLocation(
    @Param('code_entreprise') code_entreprise: string,
    @Param('site_locations') site_locations: string,
  ) {
    return this.personneService.allGetLocation(code_entreprise, site_locations);
  }


  @Get(':code_entreprise')
  async all(
      @Query('page') page = 1,
      @Param('code_entreprise') code_entreprise: string,
    ) {
    return this.personneService.paginate(page, code_entreprise);
  }

  @Get('get-syndicat/:code_entreprise')
  async getSyndicat(
    @Param('code_entreprise') code_entreprise: string
  ) {
    return this.personneService.getSyndicat(code_entreprise);
  }

  @Get('get-corbeil/:code_entreprise')
  async corbeil(
    @Param('code_entreprise') code_entreprise: string
  ) {
    return this.personneService.corbeil(code_entreprise);
  }

  @Put('reset-statut-paie-all/:code_entreprise')
  async resetStatutPaieAll(
    @Param('code_entreprise') code_entreprise: string
  ) {
    return this.personneService.resetStatutPaieAll(code_entreprise);
  }

  @Put('reset-statut-paie/:code_entreprise/:id')
  async resetStatutPaie(
    @Param('code_entreprise') code_entreprise: string,
    @Param('id') id: number
  ) {
    return this.personneService.resetStatutPaie(code_entreprise, id);
  }


  @Post()
  async create(@Body() body: PersonnelCreateDto): Promise<Personnel> {
    const password = await bcrypt.hash('1234', 12);
    const date_paie = new Date();
    return this.personneService.create({ 
      ...body,
      date_paie,
      password
    });
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
        const sexe = (element.sexe) ? element.sexe : 'Homme';
        const monnaie = (element.monnaie) ? element.monnaie.toUpperCase() : 'USD';
        const statut_paie = 'En attente';
        const password = await bcrypt.hash('1234', 12); 
        const created = new Date();
        const update_created = new Date(); 
        console.log("data csv", element);
        return this.personneService.create({
          photo: element.photo,
          nom: (element.nom) ? element.nom : '-',
          postnom: (element.postnom) ? element.postnom : '-',
          prenom: (element.prenom) ? element.prenom : '-',
          email: (element.email) ? element.email : '-',
          telephone: (element.telephone) ? element.telephone : '-',
          adresse: (element.adresse) ? element.adresse : '-',
          sexe: sexe,
          date_naissance: (element.date_naissance) ? element.date_naissance : new Date(),
          lieu_naissance: (element.lieu_naissance) ? element.lieu_naissance : '-',
          nationalite: element.nationalite, 
          etat_civile: (element.etat_civile) ? element.etat_civile : 'Marié(e)',
          nbr_dependants: (element.nbr_dependants) ? element.nbr_dependants : 0,
          matricule: `${element.matricule}-${element.code_entreprise}`,
          numero_cnss: (element.numero_cnss) ? element.numero_cnss : '-',
          category: 'Manoeuvres Ordinaires (MO)',
          statut_personnel: false,
          roles: ['Mes Bulletins'],
          permission: 'R',
          type_contrat: (element.type_contrat) ? element.type_contrat : 'CDD', 
          date_debut_contrat: (element.date_debut_contrat) ? element.date_debut_contrat : new Date(), 
          date_fin_contrat: (element.date_fin_contrat) ? element.date_fin_contrat : new Date(),
          monnaie: monnaie,
          alloc_logement: (element.alloc_logement) ? element.alloc_logement : '0', 
          alloc_transport: (element.alloc_transport) ? element.alloc_transport : '0', 
          alloc_familliale: (element.alloc_familliale) ? element.alloc_familliale : '0',
          soins_medicaux: (element.soins_medicaux) ? element.soins_medicaux : '0', 
          salaire_base: (element.salaire_base) ? element.soins_medicaux : '0', 
          compte_bancaire: (element.compte_bancaire) ? element.compte_bancaire : '-', 
          nom_banque: (element.nom_banque) ? element.nom_banque : '-', 
          frais_bancaire: (element.frais_bancaire) ? element.frais_bancaire : '0', 
          // cv_url: ,
          syndicat: false,
          date_paie: new Date(),
          statut_paie: statut_paie,
          password: password,
          signature: (element.signature) ? element.signature : '-',
          created: created,
          update_created : update_created,
          entreprise: (element.entreprise) ? element.entreprise: '-',
          code_entreprise: (element.code_entreprise) ? element.code_entreprise: '-',
          is_delete: false
        }
      ); 
      });
    } catch (error) {
      console.log('error', error);
      throw new BadRequestException(error);
    }
  }

  @Post('download-xlsx/:code_entreprise/:start_date/:end_date') 
  async downloadReport(
    @Res() res: Response,
    @Param('code_entreprise') code_entreprise: string,
    @Param('start_date') start_date: Date,
    @Param('end_date') end_date: Date
    ) {
      let result = await this.personneService.downloadExcel(code_entreprise, start_date, end_date);
        // console.log("result", result);  
        res.set("Content-Type", "text/xlsx");
      res.download(`${result}`);
  } 

  @Post('download-model-xlsx/:code_entreprise')
  async downloadModelReport(
    @Res() res: Response,
    @Param('code_entreprise') code_entreprise: string,
    ) {
      let result = await this.personneService.downloadModelExcel(code_entreprise);
        // console.log("result", result);  
        res.set("Content-Type", "text/xlsx");
      res.download(`${result}`);
  } 


  @Get('get/:id')
  async get(@Param('id') id: number) {
    return this.personneService.findGetOne({id});
  }

  @Get('get-matricule/:matricule')
  async getMatricule(@Param('matricule') matricule: string) {
    return this.personneService.getMatricule({matricule});
  }

  // User lui meme modifie
  @Put('info')
  async updateInfo(
    @Req() request: Request,
    @Body() body: PersonnelUpdateDto ) {
    const id = await this.authService.personnelId(request);

    const update_created = new Date();
    await this.personneService.update(id, {...body, update_created});
    
    return this.personneService.findGetOne({id});
  }


  @Put('password')
  async updatePassword(
    @Req() request: Request, 
    @Body('password') password: string,
    @Body('password_confirm') password_confirm: string,
  ) {
    if(password !== password_confirm) {
      throw new BadRequestException("Mot de passe de correspond pas.");
  }
    const id = await this.authService.personnelId(request);

    const hashed = await bcrypt.hash(password, 12);

    await this.personneService.update(id, {
      password: hashed
    });
    
    return this.personneService.findGetOne({id});
  }


  // Modification des infos user par l'admin
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: PersonnelUpdateDto
  ) { 

    const update_created = new Date();
    await this.personneService.update(id, {...body, update_created});   
    return this.personneService.findGetOne({id});
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
      return this.personneService.delete(id);
  }
}
