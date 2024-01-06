import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm';
import { Salaire } from './models/salaire.entity';
import { Workbook } from 'exceljs';
import * as tmp  from 'tmp'; 
import { SalaireExcel } from './models/salaire_excel';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class SalairesService extends AbstractService {
    constructor(
        @InjectRepository(Salaire) private readonly salaireRepository: Repository<Salaire>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(salaireRepository); 
    }

    allGet(code_entreprise): Promise<any[]> {
        return this.repository.find({
            // relations: {
            //     personnel: true
            // },
            relations: [
                'personnel', 
                'personnel.departements', 
                'personnel.titles', 
                'personnel.fonctions', 
                'personnel.services', 
                'personnel.site_locations'
            ],
            where: {code_entreprise},
            order: {'created': 'DESC'}
        });
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: [
                'personnel', 
                'personnel.departements', 
                'personnel.titles', 
                'personnel.fonctions', 
                'personnel.services', 
                'personnel.site_locations'
            ], 
        })
    }

    netAPayerTotal(code_entreprise, month, year) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(net_a_payer as decimal(20,2))), 0) as sum
            FROM salaires WHERE 
            code_entreprise='${code_entreprise}' AND 
            statut='Disponible' AND 
            EXTRACT(MONTH FROM "date_paie" ::TIMESTAMP) = '${month}' AND
            EXTRACT(YEAR FROM "date_paie" ::TIMESTAMP) = '${year}';
        `);
    }

    iprTotal(code_entreprise, month, year) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(ipr as decimal(20,2))), 0) as sum
            FROM salaires WHERE 
            code_entreprise='${code_entreprise}' AND 
            statut='Disponible' AND 
            EXTRACT(MONTH FROM "date_paie" ::TIMESTAMP) = '${month}' AND
            EXTRACT(YEAR FROM "date_paie" ::TIMESTAMP) = '${year}';
        `);
    }

    cnssQPOTotal(code_entreprise, month, year) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(cnss_qpo as decimal(20,2))), 0) as sum
            FROM salaires WHERE 
            code_entreprise='${code_entreprise}' AND 
            statut='Disponible' AND
            EXTRACT(MONTH FROM "date_paie" ::TIMESTAMP) = '${month}' AND
            EXTRACT(YEAR FROM "date_paie" ::TIMESTAMP) = '${year}';
        `);
    }

    rbiTotal(code_entreprise, month, year) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(rbi as decimal(20,2))), 0) as sum
            FROM salaires WHERE 
            code_entreprise='${code_entreprise}' AND 
            statut='Disponible' AND
            EXTRACT(MONTH FROM "date_paie" ::TIMESTAMP) = '${month}' AND
            EXTRACT(YEAR FROM "date_paie" ::TIMESTAMP) = '${year}';
        `);
    }

    fraisBancaireTotal(code_entreprise, month, year) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(prise_en_charge_frais_bancaire as decimal(20,2))), 0) as sum
            FROM salaires WHERE 
            code_entreprise='${code_entreprise}' AND 
            statut='Disponible' AND
            EXTRACT(MONTH FROM "date_paie" ::TIMESTAMP) = '${month}' AND
            EXTRACT(YEAR FROM "date_paie" ::TIMESTAMP) = '${year}';
        `);
    }

    heureSuppTotal(code_entreprise, month, year) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(heure_supplementaire_monnaie as decimal(20,2))), 0) as sum
            FROM salaires WHERE 
            code_entreprise='${code_entreprise}' AND 
            statut='Disponible' AND
            EXTRACT(MONTH FROM "date_paie" ::TIMESTAMP) = '${month}' AND
            EXTRACT(YEAR FROM "date_paie" ::TIMESTAMP) = '${year}';
        `);
    }

    primeTotal(code_entreprise, month, year) {
        return this.dataSource.query(`
            SELECT  (

                (
                    SELECT COALESCE(SUM(cast(primes as decimal(20,2))), 0) as divers
                    FROM salaires WHERE 
                    code_entreprise='${code_entreprise}' AND 
                    statut='Disponible' AND
                    EXTRACT(MONTH FROM "date_paie" ::TIMESTAMP) = '${month}' AND
                        EXTRACT(YEAR FROM "date_paie"::TIMESTAMP) = '${year}'
                )
                +
                (
                    SELECT COALESCE(SUM(cast(prime_anciennete as decimal(20,2))), 0) as anciennete
                    FROM salaires WHERE 
                    code_entreprise='${code_entreprise}' AND 
                    statut='Disponible' AND
                    EXTRACT(MONTH FROM "date_paie" ::TIMESTAMP) = '${month}' AND
                    EXTRACT(YEAR FROM "date_paie" ::TIMESTAMP) = '${year}'
                )
            ) AS sum;
        `);
    }

    penalitesTotal(code_entreprise, month, year) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(penalites as decimal(20,2))), 0) as sum
            FROM salaires WHERE 
            code_entreprise='${code_entreprise}' AND 
            statut='Disponible' AND
            EXTRACT(MONTH FROM "date_paie" ::TIMESTAMP) = '${month}' AND
            EXTRACT(YEAR FROM "date_paie" ::TIMESTAMP) = '${year}';
        `);
    }

    syndicatTotal(code_entreprise, month, year) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(syndicat as decimal(20,2))), 0) as sum
            FROM salaires WHERE 
            code_entreprise='${code_entreprise}' AND 
            statut='Disponible' AND
            EXTRACT(MONTH FROM "date_paie" ::TIMESTAMP) = '${month}' AND
            EXTRACT(YEAR FROM "date_paie" ::TIMESTAMP) = '${year}';
        `);
    }


    statutPaie(code_entreprise, month, year) {
        return this.dataSource.query(`
        SELECT "salaires"."id",
            "salaires"."monnaie",
            "salaires"."taux_dollard",
            "salaires"."nbr_dependants",
            "salaires"."alloc_logement",
            "salaires"."alloc_transport", 
            "salaires"."alloc_familliale", 
            "salaires"."soins_medicaux", 
            "salaires"."salaire_base",
            "salaires"."primes", 
            "salaires"."anciennete_nbr_age", 
            "salaires"."prime_anciennete", 
            "salaires"."heures_supp", 
            "salaires"."heure_supplementaire_monnaie", 
            "salaires"."conge_paye", 
            "salaires"."nbre_jrs_preste", 
            "salaires"."nbre_jrs_ferie", 
            "salaires"."rbi", 
            "salaires"."cnss_qpo", 
            "salaires"."rni", 
            "salaires"."ipr", 
            "salaires"."impot_elide", 
            "salaires"."syndicat", 
            "salaires"."penalites", 
            "salaires"."avance_slaire", 
            "salaires"."prise_en_charge_frais_bancaire", 
            "salaires"."pres_entreprise", 
            "salaires"."net_a_payer", 
            "salaires"."statut",
            "salaires"."date_paie", 
            "salaires"."signature", 
            "salaires"."created",
            "salaires"."update_created",
            "salaires"."entreprise",
            "salaires"."code_entreprise",
            "salaires"."departement",
            "salaires"."fonction",
            "salaires"."title",
            "salaires"."service",
            "salaires"."site_location",

            "personnels"."matricule",
            "personnels"."nom",
            "personnels"."postnom",
            "personnels"."prenom",
            "personnels"."compte_bancaire",
            "personnels"."frais_bancaire",
            "personnels"."nom_banque"
            FROM salaires
            LEFT JOIN "personnels" ON "personnels"."id" = "salaires"."personnelId"
            WHERE
            "salaires"."code_entreprise"='${code_entreprise}' AND 
            EXTRACT(MONTH FROM "salaires"."date_paie" ::TIMESTAMP) = '${month}' AND
            EXTRACT(YEAR FROM "salaires"."date_paie" ::TIMESTAMP) = '${year}';
       
        `);
    }

    relevePaie(code_entreprise, month, year) {
        return this.dataSource.query(`
            SELECT "salaires"."id",
                "salaires"."monnaie",
                "salaires"."taux_dollard",
                "salaires"."nbr_dependants",
                "salaires"."alloc_logement",
                "salaires"."alloc_transport", 
                "salaires"."alloc_familliale", 
                "salaires"."soins_medicaux", 
                "salaires"."salaire_base",
                "salaires"."primes", 
                "salaires"."anciennete_nbr_age", 
                "salaires"."prime_anciennete", 
                "salaires"."heures_supp", 
                "salaires"."heure_supplementaire_monnaie", 
                "salaires"."conge_paye", 
                "salaires"."nbre_jrs_preste", 
                "salaires"."nbre_jrs_ferie", 
                "salaires"."rbi", 
                "salaires"."cnss_qpo", 
                "salaires"."rni", 
                "salaires"."ipr", 
                "salaires"."impot_elide", 
                "salaires"."syndicat", 
                "salaires"."penalites", 
                "salaires"."avance_slaire", 
                "salaires"."prise_en_charge_frais_bancaire", 
                "salaires"."pres_entreprise", 
                "salaires"."net_a_payer", 
                "salaires"."statut",
                "salaires"."date_paie", 
                "salaires"."signature", 
                "salaires"."created",
                "salaires"."update_created",
                "salaires"."entreprise",
                "salaires"."code_entreprise",
                "salaires"."departement",
                "salaires"."fonction",
                "salaires"."title",
                "salaires"."service",
                "salaires"."site_location",

                "personnels"."matricule",
                "personnels"."nom",
                "personnels"."postnom",
                "personnels"."prenom",
                "personnels"."compte_bancaire",
                "personnels"."frais_bancaire",
                "personnels"."nom_banque"
            FROM salaires
            LEFT JOIN "personnels" ON "personnels"."id" = "salaires"."personnelId"  
            WHERE
            "salaires"."code_entreprise"='${code_entreprise}' AND
            "salaires"."statut"='Disponible' AND
            EXTRACT(MONTH FROM "salaires"."date_paie" ::TIMESTAMP) = '${month}' AND
            EXTRACT(YEAR FROM "salaires"."date_paie" ::TIMESTAMP) = '${year}';
        `);
    }

    // Liste des entreprises
    list_services(code_entreprise) {
        return this.dataSource.query(`
            SELECT service
            FROM serviceprefs WHERE code_entreprise='${code_entreprise}'
            ORDER BY created DESC;
        `);
    }

    // Numero farde pour classer les differentes masses salariales
    farde(code_entreprise) {
        return this.dataSource.query(`
        SELECT EXTRACT(MONTH FROM "date_paie" ::TIMESTAMP) as month, 
        EXTRACT(YEAR FROM "date_paie" ::TIMESTAMP) AS year 
        FROM salaires WHERE code_entreprise='${code_entreprise}' 
        GROUP BY EXTRACT(MONTH FROM "date_paie" ::TIMESTAMP), 
            EXTRACT(YEAR FROM "date_paie" ::TIMESTAMP)
        ORDER BY EXTRACT(MONTH FROM "date_paie" ::TIMESTAMP),
             EXTRACT(YEAR FROM "date_paie" ::TIMESTAMP) DESC;
        `);
    }

    fardeDisponible(code_entreprise) {
        return this.dataSource.query(`
        SELECT EXTRACT(MONTH FROM "date_paie" ::TIMESTAMP) as month, 
        EXTRACT(YEAR FROM "date_paie" ::TIMESTAMP) AS year 
        FROM salaires WHERE code_entreprise='${code_entreprise}' AND
         statut='Disponible'
        GROUP BY  EXTRACT(MONTH FROM "date_paie" ::TIMESTAMP), 
            EXTRACT(YEAR FROM "date_paie" ::TIMESTAMP)
        ORDER BY EXTRACT(MONTH FROM "date_paie" ::TIMESTAMP),
             EXTRACT(YEAR FROM "date_paie" ::TIMESTAMP) DESC;
        `);
    } 

    // Uniquement pour l'employé
    mesBulletins(code_entreprise, matricule) {
        return this.dataSource.query(`
            SELECT "salaires"."id",
                "salaires"."monnaie",
                "salaires"."taux_dollard",
                "salaires"."nbr_dependants",
                "salaires"."alloc_logement",
                "salaires"."alloc_transport", 
                "salaires"."alloc_familliale", 
                "salaires"."soins_medicaux", 
                "salaires"."salaire_base",
                "salaires"."primes", 
                "salaires"."anciennete_nbr_age", 
                "salaires"."prime_anciennete", 
                "salaires"."heures_supp", 
                "salaires"."heure_supplementaire_monnaie", 
                "salaires"."conge_paye", 
                "salaires"."nbre_jrs_preste", 
                "salaires"."nbre_jrs_ferie", 
                "salaires"."rbi", 
                "salaires"."cnss_qpo", 
                "salaires"."rni", 
                "salaires"."ipr", 
                "salaires"."impot_elide", 
                "salaires"."syndicat", 
                "salaires"."penalites", 
                "salaires"."avance_slaire", 
                "salaires"."prise_en_charge_frais_bancaire", 
                "salaires"."pres_entreprise", 
                "salaires"."net_a_payer", 
                "salaires"."statut", 
                "salaires"."signature", 
                "salaires"."created", 
                "salaires"."update_created", 
                "salaires"."entreprise", 
                "salaires"."code_entreprise", 
                "personnels"."matricule"
            FROM salaires 
            LEFT JOIN "personnels" ON "personnels"."id" = "salaires"."personnelId"
            WHERE
            "salaires"."code_entreprise"='${code_entreprise}' AND
            "personnels"."matricule"='${matricule}';
        `);
    }





    // ####################### CALCUL SALAIRE ####################################################
    
    getJrPrestE(code_entreprise, matricule, date_paie) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(prestation ::FLOAT), 0) as presence
            FROM apointements  WHERE 
            code_entreprise='${code_entreprise}' AND
            matricule='${matricule}'  AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM '${date_paie}' ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM '${date_paie}' ::TIMESTAMP)
        `)
    }

    getJrCongePayE(code_entreprise, matricule, date_paie) {
        return this.dataSource.query(`
        SELECT  (

            (SELECT count(*) FILTER (WHERE apointement='AM') as am
            FROM apointements WHERE 
                code_entreprise='${code_entreprise}' AND
                matricule='${matricule}'  AND
                '${date_paie}' ::TIMESTAMP < date_sortie ::TIMESTAMP
            )
            +
            (SELECT count(*) FILTER (WHERE apointement='CA') as ca
            FROM apointements WHERE 
                code_entreprise='${code_entreprise}' AND
                matricule='${matricule}'  AND
                '${date_paie}' ::TIMESTAMP < date_sortie ::TIMESTAMP
            )  
            +
            (SELECT count(*) FILTER (WHERE apointement='CC') as cc
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND
                matricule='${matricule}' AND '${date_paie}' ::TIMESTAMP < date_sortie ::TIMESTAMP
            )
             
            ) AS conge;
        `);
    }

    nbrHeureSupp(code_entreprise, id, date_paie, pris_en_compte_mois_plus_1) {
        // Si oui prendre en compte le mois actuel
        if (pris_en_compte_mois_plus_1) {
            return this.dataSource.query(`
                SELECT COALESCE(SUM(nbr_heures), 0) as sum
                FROM heures_supp  WHERE 
                code_entreprise='${code_entreprise}' AND
                "personnelId"='${id}' AND
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM '${date_paie}' ::TIMESTAMP) - 1  
                AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM '${date_paie}' ::TIMESTAMP)
                OR 
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) = 12 AND 
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) < EXTRACT(YEAR FROM '${date_paie}' ::TIMESTAMP);
            `);
        } else {
            return this.dataSource.query(`
                SELECT COALESCE(SUM(nbr_heures), 0) as sum
                FROM heures_supp  WHERE 
                code_entreprise='${code_entreprise}' AND
                "personnelId"='${id}' AND
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM '${date_paie}' ::TIMESTAMP) AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM '${date_paie}' ::TIMESTAMP);
            `);
        }
       
    }


    primeTotalCDF(code_entreprise, id, date_paie, pris_en_compte_mois_plus_1) {
        // Si oui prendre en compte le mois actuel
        if (pris_en_compte_mois_plus_1) {
             return this.dataSource.query(`
        SELECT COALESCE(SUM(cast(montant as decimal(20,2))), 0) as sum
            FROM primes  WHERE 
            monnaie='CDF' AND
            code_entreprise='${code_entreprise}' AND
            "personnelId"='${id}' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM '${date_paie}' ::TIMESTAMP)- 1  
            AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM '${date_paie}' ::TIMESTAMP)
            OR EXTRACT(MONTH FROM "created" ::TIMESTAMP) = 12 AND 
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) < EXTRACT(YEAR FROM '${date_paie}' ::TIMESTAMP);
        `);
        } else {
            return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(montant as decimal(20,2))), 0) as sum
                FROM primes  WHERE 
                monnaie='CDF' AND
                code_entreprise='${code_entreprise}' AND
                "personnelId"='${id}' AND
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM '${date_paie}' ::TIMESTAMP) AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM '${date_paie}' ::TIMESTAMP);
            `);
        }
        
    } 

    primeTotalUSD(code_entreprise, id, date_paie, pris_en_compte_mois_plus_1) {
        // Si oui prendre en compte le mois actuel
        if (pris_en_compte_mois_plus_1) {
              return this.dataSource.query(`
        SELECT COALESCE(SUM(cast(montant as decimal(20,2))), 0) as sum
            FROM primes WHERE 
            monnaie='USD' AND
            code_entreprise='${code_entreprise}' AND
            "personnelId"='${id}' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM '${date_paie}' ::TIMESTAMP)- 1  
            AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM '${date_paie}' ::TIMESTAMP)
            OR EXTRACT(MONTH FROM "created" ::TIMESTAMP) = 12 AND 
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) < EXTRACT(YEAR FROM '${date_paie}' ::TIMESTAMP);
        `);
        } else {
            return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(montant as decimal(20,2))), 0) as sum
                FROM primes WHERE 
                monnaie='USD' AND
                code_entreprise='${code_entreprise}' AND
                "personnelId"='${id}' AND
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM '${date_paie}' ::TIMESTAMP) AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM '${date_paie}' ::TIMESTAMP);
            `);  
        }
        
    } 

    penaliteTotalCDF(code_entreprise, id, date_paie, pris_en_compte_mois_plus_1) {
        // Si oui prendre en compte le mois actuel
        if (pris_en_compte_mois_plus_1) {
             return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(montant as decimal(20,2))), 0) as sum
                FROM penalites WHERE 
                monnaie='CDF' AND
                code_entreprise='${code_entreprise}' AND
                "personnelId"='${id}' AND
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM '${date_paie}' ::TIMESTAMP)- 1  
                AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM '${date_paie}' ::TIMESTAMP)
                OR EXTRACT(MONTH FROM "created" ::TIMESTAMP) = 12 AND 
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) < EXTRACT(YEAR FROM '${date_paie}' ::TIMESTAMP);
            `);
        } else {
            return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(montant as decimal(20,2))), 0) as sum
                FROM penalites WHERE 
                monnaie='CDF' AND
                code_entreprise='${code_entreprise}' AND
                "personnelId"='${id}' AND
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM '${date_paie}' ::TIMESTAMP) AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM '${date_paie}' ::TIMESTAMP);
            `);
        }
        
    }
 
    penaliteTotalUSD(code_entreprise, id, date_paie, pris_en_compte_mois_plus_1) {
         // Si oui prendre en compte le mois actuel
         if (pris_en_compte_mois_plus_1) {
           return this.dataSource.query(`
                SELECT COALESCE(SUM(cast(montant as decimal(20,2))), 0) as sum
                FROM penalites  WHERE 
                monnaie='USD' AND
                code_entreprise='${code_entreprise}' AND
                "personnelId"='${id}' AND
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM '${date_paie}' ::TIMESTAMP) - 1
                AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM '${date_paie}' ::TIMESTAMP)
                OR EXTRACT(MONTH FROM "created" ::TIMESTAMP) = 12 AND 
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) < EXTRACT(YEAR FROM '${date_paie}' ::TIMESTAMP);
            `);
        } else {
            return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(montant as decimal(20,2))), 0) as sum
            FROM penalites  WHERE 
            monnaie='USD' AND
            code_entreprise='${code_entreprise}' AND
            "personnelId"='${id}' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM '${date_paie}' ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM '${date_paie}' ::TIMESTAMP);
        `);
        }
       
    }
 


    avanceSalaireTotalCDF(code_entreprise, id, date_paie) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(montant as decimal(20,2))), 0) as sum
            FROM avance_salaires WHERE 
            monnaie='CDF' AND
            code_entreprise='${code_entreprise}' AND
            "personnelId"='${id}' AND
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM '${date_paie}' ::TIMESTAMP) AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM '${date_paie}' ::TIMESTAMP);
        `);
    }
    avanceSalaireTotalUSD(code_entreprise, id, date_paie) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(montant as decimal(20,2))), 0) as sum
            FROM avance_salaires WHERE 
            monnaie='USD' AND
            code_entreprise='${code_entreprise}' AND
            "personnelId"='${id}' AND
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM '${date_paie}' ::TIMESTAMP) AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM '${date_paie}' ::TIMESTAMP);
        `);
    }

    getAnciennete(code_entreprise, id, date_debut_contrat, date_paie) {
        return this.dataSource.query(`
        SELECT '${date_paie}', 
        AGE(timestamp '${date_debut_contrat}') AS age
        FROM personnels WHERE
        code_entreprise='${code_entreprise}' AND
        "id"='${id}';
    `);
    }


    preEntrepriseCDF(code_entreprise, id, date_paie) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(deboursement as decimal(20,2))), 0) as sum
            FROM pres_entreprises WHERE 
            monnaie='CDF' AND
            code_entreprise='${code_entreprise}' AND
            "personnelId"='${id}' AND
            '${date_paie}'::TIMESTAMP > date_debut::TIMESTAMP AND
            '${date_paie}'::TIMESTAMP < date_limit::TIMESTAMP;
        `);
    }
    preEntrepriseUSD(code_entreprise, id, date_paie) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(deboursement as decimal(20,2))), 0) as sum
            FROM pres_entreprises WHERE 
            monnaie='USD' AND
            code_entreprise='${code_entreprise}' AND
            "personnelId"='${id}' AND
            '${date_paie}'::TIMESTAMP > date_debut::TIMESTAMP AND
            '${date_paie}'::TIMESTAMP < date_limit::TIMESTAMP;
        `);
    }


    deleteAllItem(code_entreprise) {
        return this.dataSource.query(`
            DELETE FROM salaires WHERE  
            code_entreprise='${code_entreprise}'
            ORDER BY created DESC;
        `);
    } 


    isNotify(id) {
        return this.dataSource.query(`
            SELECT *
            FROM salaires WHERE  
            "personnelId"='${id}' AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = 
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            ORDER BY created DESC LIMIT 6;
        `);
    }
  

    async downloadExcel(code_entreprise, start_date, end_date) {

        let data: SalaireExcel[] = [];

        data = await this.dataSource.query(`
            SELECT *
            FROM salaires 
            LEFT JOIN "personnels" ON "personnels"."id" = "salaires"."personnelId"
            WHERE
            "salaires"."code_entreprise"='${code_entreprise}' AND
            "salaires"."created">='${start_date}' AND 
            "salaires"."created"<='${end_date}';
        `); 

        if(!data) {
            throw new NotFoundException("No data download");
        }

        let rows: SalaireExcel[] = [];

        data.forEach(doc => {
            rows.push(doc);
        });

        console.log('row', rows);

        let book = new Workbook();
        let sheet = book.addWorksheet('LISTE DES SALAIRES');

        const headers = [
            { header: 'ID', key: 'id', width: 10.5 }, 
            { header: 'Matricule', key: 'matricule', width: 20.5 },
            { header: 'Nom', key: 'nom', width: 20.5 },
            { header: 'Post-nom', key: 'postnom', width: 20.5 },
            { header: 'Prénom', key: 'prenom', width: 20.5 },
            { header: 'Mail', key: 'email', width: 30.5 },
            { header: 'Téléphone', key: 'telephone', width: 20.5 },
            
            { header: 'Statut de paie', key: 'statut', width: 20.5 },
            { header: 'Monnaie', key: 'monnaie', width: 20.5 },
            { header: 'Taux d\'échange', key: 'taux_dollard', width: 30.5 },
            { header: 'Nbre de dépendants', key: 'nbr_dependants', width: 20.5 }, 
            { header: 'Alloc. logement', key: 'alloc_logement', width: 20.5 },
            { header: 'Alloc. transport', key: 'alloc_transport', width: 20.5 },
            { header: 'Alloc. familliale', key: 'alloc_familliale', width: 20.5 },
            { header: 'Soins médicaux', key: 'soins_medicaux', width: 20.5 },
            { header: 'Salaire base', key: 'salaire_base', width: 20.5 },
            { header: 'Primes divers', key: 'primes', width: 20.5 },
            { header: 'Age ancienneté', key: 'anciennete_nbr_age', width: 20.5 },
            { header: 'Prime ancienneté', key: 'prime_anciennete', width: 20.5 },
            { header: 'Heures supp.', key: 'heures_supp', width: 20.5 },
            { header: 'Tarif Heures supp.', key: 'heure_supplementaire_monnaie', width: 20.5 },
            { header: 'Conge payé', key: 'conge_paye', width: 20.5 },
            { header: 'Nbre des jr presté', key: 'nbre_jrs_preste', width: 20.5 },
            { header: 'Nbre des jrs ferié', key: 'nbre_jrs_ferie', width: 20.5 },
            { header: 'RBI', key: 'rbi', width: 20.5 },
            { header: 'CNSS QPO', key: 'cnss_qpo', width: 20.5 },
            { header: 'RNI', key: 'rni', width: 20.5 },
            { header: 'IPR', key: 'ipr', width: 20.5 },
            { header: 'Pénalités', key: 'penalites', width: 20.5 },
            { header: 'Avance salaire', key: 'avance_slaire', width: 20.5 },
            { header: 'Syndicat', key: 'syndicat', width: 20.5 },
            { header: 'Frais bancaire', key: 'prise_en_charge_frais_bancaire', width: 20.5 },
            { header: 'Près entreprise', key: 'pres_entreprise', width: 20.5 },
            { header: 'Net à payer', key: 'net_a_payer', width: 20.5 },
            
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



    private styleSheet(sheet) {

        // Set the height of header
        sheet.getRow(1).height = 30.5;

        // Font color
        sheet.getRow(1).font = { size: 11.5, bold: true, color: {argb: 'FFFFFF'}};

        // Background color
        sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', bgColor: {argb: '2F635B'}, fgColor: { argb: '2F635B'}};

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


    fileStream() {
        return createReadStream(join(process.cwd(), `bulletin.pdf`));
    }
}


