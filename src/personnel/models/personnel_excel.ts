export class PersonnelExcel { 
    id: number;  
    nom: string;
    postnom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
    sexe: string;
    date_naissance: Date;
    lieu_naissance: string;
    nationalite: string;
    etat_civile: string;
    nbr_dependants: number; 
    matricule: string;
    numero_cnss: string;
    category: string;
    statut_personnel: boolean;
    role: string[];
    permission: string; 
    
    departement: string;
    title: string;
    fonction: string;
    service: string; // caisse
    site_location: string; // Site de travail

    type_contrat: string;
    date_debut_contrat: Date;
    date_fin_contrat: Date;
    monnaie: string;
    alloc_logement: string;
    alloc_transport: string;
    alloc_familliale: string;
    soins_medicaux: string;
    salaire_base: string;
    compte_bancaire: string;
    nom_banque: string;
    frais_bancaire: string; 
    syndicat: boolean;
    signature: string;
    created: Date;
    update_created : Date;

}