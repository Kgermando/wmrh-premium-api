import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm'; 
import { DataSource } from 'typeorm';

@Injectable()
export class EmployesService {
    constructor(
        @InjectDataSource() private dataSource: DataSource,
    ) {} 

    async getPieSexeAll(code_entreprise: string, start_date, end_date) {
        return this.dataSource.query(`
            SELECT sexe, COUNT(sexe) 
            FROM personnels WHERE code_entreprise='${code_entreprise}' AND
            nom!='admin' AND
            "personnels"."is_delete"='false' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP
            GROUP BY sexe;
        `);
    }


    
    async departementAll(code_entreprise: string, start_date, end_date) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM departements WHERE code_entreprise='${code_entreprise}' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }

    async syndicatAll(code_entreprise: string, start_date, end_date) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM personnels WHERE code_entreprise='${code_entreprise}' AND 
            "personnels"."is_delete"='false' AND
            syndicat=true AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }

    async siteLocationAll(code_entreprise: string, start_date, end_date) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM site_locations WHERE code_entreprise='${code_entreprise}' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }

    async compteActifAll(code_entreprise: string, start_date, end_date) {
        return this.dataSource.query(`
            SELECT COUNT(*) 
            FROM personnels WHERE code_entreprise='${code_entreprise}' AND  
            statut_personnel=true AND
            "personnels"."is_delete"='false' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }




    // Employés par departement, Services, Site de travail
    async employeDepartementAll(code_entreprise: string, start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE("departement", LEFT('Non affecté', 40)) AS departement, COUNT(*)
            FROM personnels
            LEFT JOIN "departements" ON "departements"."id" = "personnels"."departementsId"
            WHERE "personnels"."code_entreprise"='${code_entreprise}' AND
            "personnels"."is_delete"='false' AND
            "personnels"."created"
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP
            GROUP BY "departement";
        `);
    }

    async employeServiceAll(code_entreprise: string, start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE("service", LEFT('Non affecté', 40)) AS service, COUNT(*)
            FROM personnels
            LEFT JOIN "serviceprefs" ON "serviceprefs"."id" = "personnels"."servicesId"
            WHERE "personnels"."code_entreprise"='${code_entreprise}' AND
            "personnels"."is_delete"='false' AND
            "personnels"."created"
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP
            GROUP BY "service";
        `);
    }

    async employeSiteLocationAll(code_entreprise: string, start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE("site_location", LEFT('Non affecté', 40)) AS site_location, COUNT(*)
            FROM personnels
            LEFT JOIN "site_locations" ON "site_locations"."id" = "personnels"."siteLocationsId"
            WHERE "personnels"."code_entreprise"='${code_entreprise}' AND
            "personnels"."is_delete"='false' AND
            "personnels"."created"
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP
            GROUP BY "site_location";
        `);
    }


    // Age de contrat par employés
    async ageContratEmployeAll(code_entreprise: string, start_date, end_date) {
        return this.dataSource.query(`
        SELECT
            COUNT(case when date_part('year', age(date_debut_contrat))>=0 AND date_part('year', age(date_debut_contrat))<=5 then 1 end) as "Moins de 5 ans",
            COUNT(case when date_part('year', age(date_debut_contrat))>5 AND date_part('year', age(date_debut_contrat))<=10 then 1 end) as "Moins de 10 ans",
            COUNT(case when date_part('year', age(date_debut_contrat))>10 AND date_part('year', age(date_debut_contrat))<=15 then 1 end) as "Moins de 15 ans",
            COUNT(case when date_part('year', age(date_debut_contrat))>15 AND date_part('year', age(date_debut_contrat))<=20 then 1 end) as "Moins de 20 ans", 
            COUNT(case when date_part('year', age(date_debut_contrat))>20 AND date_part('year', age(date_debut_contrat))<=25 then 1 end) as "Moins de 25 ans",
            COUNT(case when date_part('year', age(date_debut_contrat))>25 then 1 end) as "Plus de 25 ans"
            FROM personnels WHERE code_entreprise='${code_entreprise}' AND
            "personnels"."is_delete"='false' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }


    // Age des employés
    async ageEmployeAll(code_entreprise: string, start_date, end_date) {
        return this.dataSource.query(`
            SELECT
                COUNT(case when date_part('year', age(date_naissance))>=18 AND date_part('year', age(date_naissance))<=25 then 1 end) as "De 18-25 ans",
                COUNT(case when date_part('year', age(date_naissance))>25 AND date_part('year', age(date_naissance))<=35 then 1 end) as "De 25-35 ans",
                COUNT(case when date_part('year', age(date_naissance))>35 AND date_part('year', age(date_naissance))<=45 then 1 end) as "De 35-45 ans",
                COUNT(case when date_part('year', age(date_naissance))>45 AND date_part('year', age(date_naissance))<=55 then 1 end) as "De 45-55 ans", 
                COUNT(case when date_part('year', age(date_naissance))>55 AND date_part('year', age(date_naissance))<=65 then 1 end) as "De 55-65 ans"
                FROM personnels WHERE code_entreprise='${code_entreprise}' AND
                "personnels"."is_delete"='false' AND
                created
                BETWEEN
                '${start_date}' ::TIMESTAMP AND
                '${end_date}' ::TIMESTAMP;
        `);
    }

}
