import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm';
import { Performence } from './models/performence.entity';

@Injectable()
export class PerformenceService extends AbstractService {
    constructor(
        @InjectRepository(Performence) private readonly performenceRepository: Repository<Performence>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(performenceRepository); 
    }

    allGet(code_entreprise): Promise<any[]> {
        // return this.repository.find({
        //     relations: {
        //         personnel: true
        //     },
        //     where: {code_entreprise},
        //     order: {'created': 'DESC'}
        // }); 
        return this.dataSource.query(`
        SELECT "performences"."id",
            "performences"."ponctualite",
            "performences"."hospitalite", 
            "performences"."travail", 
            "performences"."observation",
            "performences"."signature", 
            "performences"."created",
            "performences"."update_created",
            "performences"."entreprise",
            "performences"."code_entreprise",

            "personnels"."matricule",
            "personnels"."nom",
            "personnels"."postnom",
            "personnels"."prenom"
        FROM performences
        LEFT JOIN "personnels" ON "personnels"."id" = "performences"."personnelId"  
        WHERE
        "performences"."code_entreprise"='${code_entreprise}';
    `);
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                personnel: true
            }
        })
    }

    ponctualiteTotal(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(ponctualite), 0) as sum
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND 
            "personnelId"='${id}';
        `);
    }


    hospitaliteTotal(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(hospitalite), 0) as sum
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND 
            "personnelId"='${id}';
        `);
    }

    travailTotal(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(travail), 0) as sum
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND 
            "personnelId"='${id}';
        `);
    }

    getPieYEAR(code_entreprise, id) {
        return this.dataSource.query(`
        SELECT COALESCE(SUM(ponctualite), 0) AS ponctualite, COALESCE(SUM(hospitalite), 0) AS hospitalite, COALESCE(SUM(travail), 0) AS travail, 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) as month
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND
            "personnelId"='${id}' AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY month;
        `);
    }

    getPieAll(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(ponctualite), 0) AS ponctualite, COALESCE(SUM(hospitalite), 0) AS hospitalite, COALESCE(SUM(travail), 0) AS travail,
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) as year
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND "personnelId"='${id}'
            GROUP BY year;
        `);
    }

    ponctualiteTotalYEAR(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(ponctualite), 0) as sum
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND 
            "personnelId"='${id}' AND 
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    hospitaliteTotalYEAR(code_entreprise, id) { 
        return this.dataSource.query(`
            SELECT COALESCE(SUM(hospitalite), 0) as sum
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND 
            "personnelId"='${id}' AND 
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    travailTotalYEAR(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(travail), 0) as sum
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND 
            "personnelId"='${id}' AND 
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    ponctualiteTotalALL(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(ponctualite), 0) as sum
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND 
            "personnelId"='${id}';
        `);
    }

    hospitaliteTotalALL(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(hospitalite), 0) as sum
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND 
            "personnelId"='${id}';
        `);
    }

    travailTotalALL(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(travail), 0) as sum
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND 
            "personnelId"='${id}';
        `);
    }

    cumulTotal(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(COUNT(travail), 0) as count
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND 
            "personnelId"='${id}';
        `);
    }
    
}
