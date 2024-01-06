import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm';
import { Apointement } from './models/apointement.entity';
import * as tmp  from 'tmp';
import { Workbook } from 'exceljs';
import { PresenceExcel } from './models/presence_excel';

@Injectable()
export class ApointementService extends AbstractService {
    constructor(
        @InjectRepository(Apointement) private readonly apointementRepository: Repository<Apointement>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(apointementRepository); 
    }

    allGet(code_entreprise): Promise<any[]> {
        return this.repository.find({
            relations: {
                personnel: true
            },
            where: {code_entreprise},
            order: {'created': 'DESC'}
        }); 
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                personnel: true
            }
        })
    }

    getMatricule(code_entreprise, matricule): Promise<any[]> {
        return this.repository.find({ 
            where: {code_entreprise} && {matricule},
            order: {'date_entree': 'DESC'}
        });
    }
 
 
    registrePresence(code_entreprise, site_location, date_presence) {
        return this.dataSource.query(`
            SELECT *
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND 
            site_location='${site_location}' AND
            EXTRACT(DAY FROM "date_entree" ::TIMESTAMP) = EXTRACT(DAY FROM '${date_presence}' ::TIMESTAMP) AND
            EXTRACT(MONTH FROM "date_entree" ::TIMESTAMP) = EXTRACT(MONTH FROM '${date_presence}' ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "date_entree" ::TIMESTAMP) = EXTRACT(YEAR FROM '${date_presence}' ::TIMESTAMP)
            ORDER BY date_entree DESC;
        `);
    }

    getLastItem(code_entreprise, matricule) {
        return this.dataSource.query(`
            SELECT *
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND
            matricule='${matricule}' AND
            EXTRACT(MONTH FROM "date_entree" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "date_entree" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            ORDER BY date_entree DESC LIMIT 1;
        `);
    } 

    getPie(code_entreprise, matricule) {
        return this.dataSource.query(`
            SELECT apointement, COUNT(*) 
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND
            matricule='${matricule}' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY apointement;
        `);
    }

    getPieYEAR(code_entreprise, matricule) {
        return this.dataSource.query(`
            SELECT apointement, COUNT(*) 
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND
            matricule='${matricule}' AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY apointement;
        `);
    }

    getPieAll(code_entreprise, matricule) {
        return this.dataSource.query(`
            SELECT apointement, COUNT(*) 
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND
            matricule='${matricule}'
            GROUP BY apointement;
        `);
    }



    getItemsPAAAALL(code_entreprise) {
        return this.dataSource.query(`
            SELECT apointement, COUNT(*)
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND
            EXTRACT(DAY FROM "created" ::TIMESTAMP) = EXTRACT(DAY FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY apointement;
        `);
    }
    getItemsPAAA(code_entreprise, site_location) {
        return this.dataSource.query(`
            SELECT apointement, COUNT(*)
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND
            site_location='${site_location}' AND 
            EXTRACT(DAY FROM "created" ::TIMESTAMP) = EXTRACT(DAY FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY apointement;
        `);
    }


    getItemsCongEALL(code_entreprise) {
        return this.dataSource.query(`
            SELECT apointement, COUNT(*)
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND 
            date_sortie > CURRENT_DATE
            GROUP BY apointement, EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }
    getItemsCongE(code_entreprise, site_location) {
        return this.dataSource.query(`
            SELECT apointement, COUNT(*)
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND
            site_location='${site_location}' AND 
            date_sortie > CURRENT_DATE
            GROUP BY apointement, EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }



  async downloadExcel(code_entreprise, site_location, start_date, end_date) {
        let data: PresenceExcel[] = [];

        data = await this.dataSource.query(`
            SELECT *
            FROM apointements 
            LEFT JOIN "personnels" ON "personnels"."id" = "apointements"."personnelId"
            WHERE
            "apointements"."code_entreprise"='${code_entreprise}' AND
            "apointements"."site_location"='${site_location}' AND
            "apointements"."created">='${start_date}' AND 
            "apointements"."created"<='${end_date}';
        `);

        if(!data) {
            throw new NotFoundException("No data download");
        }

        let rows: PresenceExcel[] = [];

        data.forEach(doc => {
            rows.push(doc);
        });

        let book = new Workbook();
        let sheet = book.addWorksheet('REGISTRE DE PRESENCE');

        const headers = [
            { header: 'ID', key: 'id', width: 10.5 }, 
            { header: 'Site de travail', key: 'site_location', width: 20.5 },
            { header: 'Matricule', key: 'matricule', width: 20.5 },
            { header: 'Nom', key: 'nom', width: 20.5 },
            { header: 'Post-nom', key: 'postnom', width: 20.5 },
            { header: 'Prénom', key: 'prenom', width: 20.5 },
            { header: 'Pointage', key: 'apointement', width: 10.5 },
            { header: 'Observation', key: 'observation', width: 30.5 },
            { header: 'Date d\'entrée', key: 'date_entree', width: 20.5 },
            { header: 'Date de reprise', key: 'date_sortie', width: 20.5 },
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

    async downloadModelExcel(code_entreprise, site_location) {
        let data: PresenceExcel[] = [];
        data = await this.dataSource.query(`
            SELECT *
            FROM apointements WHERE
            code_entreprise='${code_entreprise}' AND
            site_location='${site_location}' 
            LIMIT 1;
        `);

        if(!data) {
            throw new NotFoundException("No data download");
        }

        let rows: PresenceExcel[] = [];

        data.forEach(doc => {
            rows.push(doc);
        });

        let book = new Workbook();
        let sheet = book.addWorksheet('FICHE DE PRESENCES');

        const headers = [ 
            { header: 'matricule', key: 'matricule', width: 20.5 },
            { header: 'apointement', key: 'apointement', width: 20.5 },
            { header: 'prestation', key: 'prestation', width: 20.5 },
            { header: 'observation', key: 'observation', width: 30.5 },
            { header: 'date_entree', key: 'date_entree', width: 20.5 },
            { header: 'date_sortie', key: 'date_sortie', width: 30.5 },
            { header: 'site_location', key: 'site_location', width: 20.5 },
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

    
}
