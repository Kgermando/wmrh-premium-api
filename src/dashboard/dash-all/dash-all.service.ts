import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export default class DashAllService {
    constructor(
        @InjectDataSource() private dataSource: DataSource,
    ) {}

    // EMPLOYES
    // Total EMPLOYES 
    async totalEnmployesAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT count(*) as total
            FROM personnels WHERE 
            code_entreprise='${code_entreprise}' AND
            "personnels"."is_delete"='false' AND
            nom!='admin';
        `); 
    }
    
    // Total employés FEMMES 
    async totalEnmployeFemmeAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT count(*) as total
            FROM personnels WHERE 
            code_entreprise='${code_entreprise}' AND
            sexe='Femme' AND nom!='admin' AND
            "personnels"."is_delete"='false';
        `);
    }

    // Total emlployés HOMMES 
    async totalEnmployeHommeAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT count(*) as total
            FROM personnels WHERE 
            code_entreprise='${code_entreprise}' AND
            sexe='Homme' AND nom!='admin' AND
            "personnels"."is_delete"='false';
        `);
    }

    // Performences Employé  
    // Pour dans l'année il sufit de mettre YEAR
    getPerformencesAll(code_entreprise, start_date, end_date) {
        return this.dataSource.query(`
            SELECT SUM(ponctualite) AS ponctualite, 
                SUM(hospitalite) AS hospitalite, 
                SUM(travail) AS travail, 
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) as year
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP
            GROUP BY year
            ORDER BY year ASC;
        `);
    }


    // Finances

    // Masse salarial 

    async masseSalarialAll(code_entreprise, start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(net_a_payer as decimal(20,2))), 0) as net_a_payer
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }

    // Progression de paie En attente, disponible et traitement 

    async statutPaieAll(code_entreprise, start_date, end_date) {
        return this.dataSource.query(`
        SELECT statut_paie, COUNT(statut_paie) 
            FROM personnels
            WHERE code_entreprise='${code_entreprise}' AND
            "personnels"."is_delete"='false' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP
            GROUP BY statut_paie; 
        `); 
    } 


    // Alocations logement, transport, famillial, soins medicaux 
    allocationALl(code_entreprise, start_date, end_date) {
        return this.dataSource.query(`
        SELECT SUM(cast(alloc_logement as decimal(20,2))) AS logement, 
            SUM(cast(alloc_transport as decimal(20,2))) AS transport, 
            SUM(cast(alloc_familliale as decimal(20,2))) AS familliale,
            SUM(cast(soins_medicaux as decimal(20,2))) AS soins_medicaux, 
            EXTRACT(MONTH FROM "date_paie" ::TIMESTAMP) as year_ans
            FROM salaires WHERE 
            code_entreprise='${code_entreprise}' AND statut='Disponible' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP
            GROUP BY year_ans
            ORDER BY year_ans ASC;
        `);
    }



    async primesAll(code_entreprise, start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(primes as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND
            created
            BETWEEN '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }

    async primeAncienneteAll(code_entreprise, start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(prime_anciennete as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }

    async penaliteAll(code_entreprise, start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(penalites as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible'  AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }

    async avanceSalaireAll(code_entreprise, start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(avance_slaire as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }

    async presEntrepriseAll(code_entreprise, start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(pres_entreprise as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }

    async heureSuppAll(code_entreprise, start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(heure_supplementaire_monnaie as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }

    async syndicatAll(code_entreprise, start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(syndicat as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }



    // Presences

    // Taux de presence, absence, maladie, .... 
    presencePieAll(code_entreprise, start_date, end_date) {
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

    // Recrutements
    // Total recrues 

    recrutementsTotalAll(code_entreprise, start_date, end_date) {
        return this.dataSource.query(`
            SELECT COUNT(*) 
            FROM postes WHERE 
            code_entreprise='${code_entreprise}' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }
 
    postulantsTotalAll(code_entreprise, start_date, end_date) {
        return this.dataSource.query(`
            SELECT COUNT(*) 
            FROM candidatures WHERE 
            statut='Postulant' AND
            code_entreprise='${code_entreprise}' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }
 

    postulantsRetenuTotalAll(code_entreprise, start_date, end_date) {
        return this.dataSource.query(`
            SELECT COUNT(*) 
            FROM candidatures WHERE 
            statut='Recrue' AND
            code_entreprise='${code_entreprise}' AND
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }


}
