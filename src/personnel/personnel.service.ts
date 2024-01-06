import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Personnel } from './models/personnel.entity';
import { DataSource, Repository } from 'typeorm';
import { Workbook } from 'exceljs';
import * as tmp  from 'tmp'; 
import { PersonnelExcel } from './models/personnel_excel'; 

@Injectable()
export class PersonnelService extends AbstractService {
    constructor(
        @InjectRepository(Personnel) private readonly  personnelRepository: Repository<Personnel>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(personnelRepository); 
    }

    getWithSupport(): Promise<any[]> {
        return this.dataSource.query(`
        SELECT "personnels"."id",
        "personnels"."nom",
        "personnels"."postnom",
        "personnels"."prenom",
        "personnels"."email",
        "personnels"."telephone",
        "personnels"."matricule",
        "personnels"."sexe",
        "serviceprefs"."service"
        FROM personnels
        LEFT JOIN "serviceprefs" ON "serviceprefs"."id" = "personnels"."servicesId"
        WHERE "personnels"."is_delete"='false';
    `);
    }

    corbeil(code_entreprise): Promise<any[]> {
        return this.dataSource.query(`
        SELECT "personnels"."id",
        "personnels"."nom",
        "personnels"."postnom",
        "personnels"."prenom",
        "personnels"."email",
        "personnels"."telephone",
        "personnels"."matricule",
        "personnels"."sexe",
        "serviceprefs"."service"
        FROM personnels
        LEFT JOIN "serviceprefs" ON "serviceprefs"."id" = "personnels"."servicesId"
        WHERE
        "personnels"."code_entreprise"='${code_entreprise}' AND
        nom!='admin' AND
        "personnels"."is_delete"='true';
    `);
    }
    

    allGet(code_entreprise): Promise<any[]> {
        return this.dataSource.query(`
        SELECT "personnels"."id",
        "personnels"."nom",
        "personnels"."postnom",
        "personnels"."prenom",
        "personnels"."email",
        "personnels"."telephone",
        "personnels"."matricule",
        "personnels"."sexe",
        "personnels"."salaire_base",
        "personnels"."statut_paie"
        FROM personnels 
        WHERE
        "personnels"."code_entreprise"='${code_entreprise}' AND
        nom!='admin' AND
        "personnels"."is_delete"='false' 
        ORDER BY "personnels"."created" DESC;
    `);
        
    }


    getAllPerformance(code_entreprise): Promise<any[]> {
        return this.dataSource.query(`
        SELECT "personnels"."id",
        "personnels"."nom",
        "personnels"."postnom",
        "personnels"."prenom",
        "personnels"."email",
        "personnels"."telephone",
        "personnels"."matricule",
        "personnels"."sexe",
        "personnels"."salaire_base",
        "personnels"."statut_paie"
        FROM personnels 
        WHERE
        "personnels"."code_entreprise"='${code_entreprise}' AND
        nom!='admin' AND
        "personnels"."is_delete"='false' 
        ORDER BY "personnels"."created" DESC;
    `);
    }

    allGetLocation(code_entreprise, site_locations): Promise<any[]> {
        return this.dataSource.query(`
        SELECT *
        FROM personnels
        LEFT JOIN "site_locations" ON "site_locations"."id" = "personnels"."siteLocationsId"
        WHERE
        "personnels"."code_entreprise"='${code_entreprise}' AND
        "personnels"."is_delete"='false' AND
        nom!='admin' AND
        "site_locations"."site_location"='${site_locations}';
    `);
    }
    

    // Mettre expandable panel dans profil avec certains de ces tables
    // Mais voir aussi comment aleger la table personnels en retirant les tables
    // que personnels ne fait pas appel Ex: Prime celui qui fait appel à personnel et non l'inverse
    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                presences: true,
                primes: true,
                penalites: true,
                avances_salaires: true,
                heures_supp: true,
                salaires: true,
                performences: true,
                pres_entreprises: true,
                // notify: true,

                departements: true,
                titles: true,
                fonctions: true,
                services: true,
                site_locations: true,
            }
        });
    }

    async getMatricule(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: [
                'presences',
            ],
        });
    }

    async paginate(page: number = 1, code_entreprise): Promise<any> {
        const {data, meta} = await super.paginate(page, code_entreprise);
        
        return {
            data: data.map(personnel => {
                const {password, ...data} = personnel;
                return data;
            }),
            meta
        }
    } 

    async presence(condition): Promise<any> {
        return await this.repository.findOne(condition);
    }

    getSyndicat(code_entreprise): Promise<any[]> {
        return this.repository.find(
            {
                where: {code_entreprise} && {is_delete: false} && {syndicat: true}
            }); 
    }

    // Tous les employés qui ont été payés il y a un mois
    resetStatutPaieAll(code_entreprise) {
        return this.dataSource.query(`
            UPDATE personnels 
            SET statut_paie = 'En attente'
            WHERE code_entreprise='${code_entreprise}' AND 
            is_delete='false' AND
            nom!='admin' AND
            statut_paie='Disponible' AND
            EXTRACT(MONTH FROM age(date_paie)) :: int >= 1;
    `);
    }

    // Reinitialier indivuellement au cas ou l'on veut payer plusieurs fois un mois
    resetStatutPaie(code_entreprise, id) {
        return this.dataSource.query(`
            UPDATE personnels 
            SET statut_paie = 'En attente'
            WHERE code_entreprise='${code_entreprise}' AND 
            is_delete='false' AND
            id='${id}' AND
            statut_paie='Disponible';
    `);
    }



    async downloadExcel(code_entreprise, start_date, end_date) {

        let data: PersonnelExcel[] = [];

        data = await this.dataSource.query(`
            SELECT *
            FROM personnels
            LEFT JOIN "departements" ON "departements"."id" = "personnels"."departementsId"
            LEFT JOIN "titles" ON "titles"."id" = "personnels"."titlesId"
            LEFT JOIN "fonctions" ON "fonctions"."id" = "personnels"."fonctionsId"
            LEFT JOIN "serviceprefs" ON "serviceprefs"."id" = "personnels"."servicesId"
            LEFT JOIN "site_locations" ON "site_locations"."id" = "personnels"."siteLocationsId"
            WHERE
            "personnels"."code_entreprise"='${code_entreprise}' AND
            "personnels"."is_delete"='false' AND
            nom!='admin' AND
            "personnels"."created">='${start_date}' AND 
            "personnels"."created"<='${end_date}';
        `);

        if(!data) {
            throw new NotFoundException("No data download");
        }

        let rows: PersonnelExcel[] = [];

        data.forEach(doc => {
            rows.push(doc);
        });

        let book = new Workbook();
        let sheet = book.addWorksheet('LISTE DES EMPLOYES');

        const headers = [
            { header: 'ID', key: 'id', width: 10.5 },
            { header: 'Nom', key: 'nom', width: 20.5 },
            { header: 'Post-nom', key: 'postnom', width: 20.5 },
            { header: 'Prénom', key: 'prenom', width: 20.5 },
            { header: 'Mail', key: 'email', width: 30.5 },
            { header: 'Téléphone', key: 'telephone', width: 20.5 },
            { header: 'Adresse', key: 'adresse', width: 30.5 },
            { header: 'Sexe', key: 'sexe', width: 20.5 },
            { header: 'Date de naissance', key: 'date_naissance', width: 25.5 },
            { header: 'Lieu de naissance', key: 'lieu_naissance', width: 20.5 }, 
            { header: 'Nationalité', key: 'nationalite', width: 20.5 },
            { header: 'État civile', key: 'etat_civile', width: 20.5 },
            { header: 'Nbre de dépendants', key: 'nbr_dependants', width: 20.5 },
            { header: 'Matricule', key: 'matricule', width: 20.5 },
            { header: 'CNSS', key: 'numero_cnss', width: 20.5 },
            { header: 'Catégorie', key: 'category', width: 30.5 },
            { header: 'Département', key: 'departement', width: 30.5 },
            { header: 'Titre', key: 'title', width: 30.5 },
            { header: 'Fonction', key: 'fonction', width: 30.5 },
            { header: 'Service', key: 'service', width: 30.5 },
            { header: 'Site de travail', key: 'site_location', width: 30.5 },
            { header: 'Statut compte', key: 'statut_personnel', width: 20.5 },
            { header: 'Type de contrat', key: 'type_contrat', width: 20.5 },
            { header: 'Date debut contrat', key: 'date_debut_contrat', width: 20.5 },
            { header: 'Date fin contrat', key: 'date_fin_contrat', width: 20.5 },
            { header: 'Devise', key: 'monnaie', width: 10.5 },
            { header: 'Alloc. logement', key: 'alloc_logement', width: 20.5 },
            { header: 'Alloc. transport', key: 'alloc_transport', width: 20.5 },
            { header: 'Alloc. familliale', key: 'alloc_familliale', width: 20.5 },
            { header: 'Soins médicaux', key: 'soins_medicaux', width: 20.5 },
            { header: 'Salaire base', key: 'salaire_base', width: 20.5 },
            { header: 'Compte bancaire', key: 'compte_bancaire', width: 20.5 },
            { header: 'Nom banque', key: 'nom_banque', width: 20.5 },
            { header: 'Frais bancaire', key: 'frais_bancaire', width: 20.5 },
            { header: 'Syndicat', key: 'syndicat', width: 20.5 },
            { header: 'Signature', key: 'signature', width: 20.5 },
            { header: 'Date de création', key: 'created', width: 20.5 },
            { header: 'Mise à jour', key: 'update_created', width: 20.5 },
        ]

        sheet.columns = headers;
        sheet.addRows(rows);

        this.styleSheet(sheet);

        let File = await new Promise((resolve, reject) => {
            tmp.file({discardDescriptor: true, prefix: `myexcelsheet`, postfix: '.xlsx', mode: parseInt('0600', 8)},
                async (err, file) => {
                if(err) throw new BadRequestException(err); 

                book.xlsx.writeFile(file).then(_ => {
                    console.log('_', resolve(file));
                    resolve(file)
                }).catch(err => {
                    throw new BadRequestException(err);
                });
            });
        });

        return File;
    }




    async downloadModelExcel(code_entreprise) {

        let data: PersonnelExcel[] = [];

        data = await this.dataSource.query(`
            SELECT * FROM personnels WHERE
            code_entreprise='${code_entreprise}' AND
            nom!='admin' AND
            is_delete='false' 
            LIMIT 2;
        `);

        if(!data) {
            throw new NotFoundException("No data download");
        }

        let rows: PersonnelExcel[] = [];

        data.forEach(doc => {
            rows.push(doc);
        });

        let book = new Workbook();
        let sheet = book.addWorksheet('MODEL EMPLOYES');

        const headers = [
            { header: 'nom', key: 'nom', width: 20.5 },
            { header: 'postnom', key: 'postnom', width: 20.5 },
            { header: 'prenom', key: 'prenom', width: 20.5 },
            { header: 'email', key: 'email', width: 30.5 },
            { header: 'telephone', key: 'telephone', width: 25.5 },
            { header: 'adresse', key: 'adresse', width: 30.5 },
            { header: 'sexe', key: 'sexe', width: 20.5 },
            { header: 'date_naissance', key: 'date_naissance', width: 20.5 },
            { header: 'nationalite', key: 'nationalite', width: 30.5 }, 
            { header: 'etat_civile', key: 'etat_civile', width: 20.5 },
            { header: 'nbr_dependants', key: 'nbr_dependants', width: 20.5 },
            { header: 'matricule', key: 'matricule', width: 20.5 },
            { header: 'numero_cnss', key: 'numero_cnss', width: 20.5 },
            // { header: 'category', key: 'category', width: 20.5 },
            // { header: 'statut_personnel', key: 'statut_personnel', width: 20.5 },
            // { header: 'roles', key: 'roles', width: 20.5 },
            // { header: 'permission', key: 'permission', width: 20.5 },
            { header: 'departements', key: 'departements', width: 30.5 },
            { header: 'titles', key: 'titles', width: 30.5 },
            { header: 'fonctions', key: 'fonctions', width: 30.5 },
            { header: 'services', key: 'services', width: 30.5 },
            { header: 'site_locations', key: 'site_locations', width: 30.5 },
            { header: 'type_contrat', key: 'type_contrat', width: 30.5 }, 
            { header: 'date_debut_contrat', key: 'date_debut_contrat', width: 20.5 },
            { header: 'date_fin_contrat', key: 'date_fin_contrat', width: 20.5 },
            { header: 'monnaie', key: 'monnaie', width: 20.5 },
            { header: 'alloc_logement', key: 'alloc_logement', width: 20.5 },
            { header: 'alloc_transport', key: 'alloc_transport', width: 20.5 },
            { header: 'alloc_familliale', key: 'alloc_familliale', width: 20.5 },
            { header: 'soins_medicaux', key: 'soins_medicaux', width: 20.5 },
            { header: 'salaire_base', key: 'salaire_base', width: 20.5 },
            { header: 'compte_bancaire', key: 'compte_bancaire', width: 30.5 }, 
            { header: 'nom_banque', key: 'nom_banque', width: 20.5 },
            { header: 'frais_bancaire', key: 'frais_bancaire', width: 20.5 },
        ]

        sheet.columns = headers;
        sheet.addRows(rows);

        this.styleSheet(sheet);

        let File = await new Promise((resolve, reject) => {
            tmp.file({discardDescriptor: true, prefix: `myexcelsheet`, postfix: '.xlsx', mode: parseInt('0600', 8)},
                async (err, file) => {
                if(err) throw new BadRequestException(err); 

                book.xlsx.writeFile(file).then(_ => {
                    console.log('_', resolve(file));
                    resolve(file)
                }).catch(err => {
                    throw new BadRequestException(err);
                });
            });
        });

        return File;
    }



    private styleSheet(sheet) {

        // Set the height of header
        sheet.getRow(1).height = 30.5;

        // Font color
        sheet.getRow(1).font = { size: 11.5, bold: true, color: {argb: 'FFFFFF'}};

        // Background color
        sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', bgColor: {argb: '1E4C87'}, fgColor: { argb: '1E4C87'}};

        // Alignments
        sheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

        // Border
        sheet.getRow(1).border = {
            top: { style: 'thin', color: { argb: '000000'}},
            left: { style: 'thin', color: { argb: 'FFFFFF'}}, 
            bottom: { style: 'thin', color: { argb: '000000'}},
            right: { style: 'thin', color: { argb: 'FFFFFF'}}
        }

    }
  
  capitalizeTest(text: string): string {
    return (text && text[0].toUpperCase() + text.slice(1).toLowerCase()) || text;
  }
    
}
