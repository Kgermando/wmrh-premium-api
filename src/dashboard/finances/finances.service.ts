import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class FinancesService {
    constructor(
        @InjectDataSource() private dataSource: DataSource,
    ) {}

    async iprAll(code_entreprise, start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(ipr as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND 
            statut='Disponible' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }

    async cnssQPOAll(code_entreprise, start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(cnss_qpo as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND 
            statut='Disponible' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }

    async totalRBIAll(code_entreprise, start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(rbi as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND 
            statut='Disponible' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }


        // Deduction (Net à payer, IPR, CNSS)
        depensePayEALl(code_entreprise, start_date, end_date) {
            return this.dataSource.query(`  
                SELECT SUM(cast(net_a_payer as decimal(20,2))) AS net_a_payer,  
                SUM(cast(ipr as decimal(20,2))) AS ipr,
                SUM(cast(cnss_qpo as decimal(20,2))) AS cnss_qpo, 
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) as month
                FROM salaires WHERE 
                code_entreprise='${code_entreprise}' AND  
                statut='Disponible' AND
                created
                BETWEEN
                '${start_date}' ::TIMESTAMP AND
                '${end_date}' ::TIMESTAMP
                GROUP BY month 
                ORDER BY month ASC;
            `);
        }
}
