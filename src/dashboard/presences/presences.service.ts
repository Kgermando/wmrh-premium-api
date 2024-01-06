import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class PresencesService {
    constructor(
        @InjectDataSource() private dataSource: DataSource,
    ) {}


    getPie(code_entreprise, start_date, end_date) {
        return this.dataSource.query(`
            SELECT apointement, COUNT(*) 
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP
            GROUP BY apointement;
        `);
    }
  

    getCourbePresenceAll(code_entreprise, start_date, end_date) {
        return this.dataSource.query(`
        SELECT 
        
        (SELECT COUNT(apointement) FROM apointements WHERE
        code_entreprise='${code_entreprise}' AND apointement='P' AND
        created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP) AS p,

        (SELECT COUNT(apointement) FROM apointements WHERE
        code_entreprise='${code_entreprise}' AND apointement='A' AND
        created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP) AS a,

        (SELECT COUNT(apointement) FROM apointements WHERE
        code_entreprise='${code_entreprise}' AND apointement='AA' AND
        created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP) AS aa, 
 
 
        EXTRACT(YEAR FROM "created" ::TIMESTAMP) as year

        FROM apointements WHERE
            code_entreprise='${code_entreprise}' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP
            GROUP BY year;
        `);
    }
}
 