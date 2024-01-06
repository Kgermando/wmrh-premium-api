import { Personnel } from "src/personnel/models/personnel.entity";

export class SalaireUpdateDto { 
    personnel?: Personnel;
    departement?: string;
    fonction?: string;
    title?: string;
    service?: string;
    site_location?: string;
    monnaie?: string;
    taux_dollard?: string;
    nbr_dependants?: number;
    alloc_logement?: string;
    alloc_transport?: string;
    alloc_familliale?: string;
    soins_medicaux?: string;
    salaire_base?: string;
    primes?: string;
    anciennete_nbr_age?: number;
    prime_anciennete?: string;
    heures_supp?: number;
    heure_supplementaire_monnaie?: string; 
    conge_paye?: number;
    nbre_jrs_preste?: number;
    nbre_jrs_ferie?: number;
    rbi?: string;
    cnss_qpo?: string;
    rni?: string;
    ipr?: string;
    impot_elide?: string;
    syndicat?: string;
    penalites?: string;
    avance_slaire?: string;
    prise_en_charge_frais_bancaire?: string;
    pres_entreprise?: string;
    net_a_payer?: string;
    statut?: string;  // Pending, Generated
    date_paie?: Date;
    signature?: string;
    created?: Date;
    update_created: Date; 
    entreprise?: string; 
    code_entreprise?: string; 
}