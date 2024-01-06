import { Poste } from "src/poste/models/poste.entity";

export class CandidatureUpdateDto { 

    search_profil?: string;
 
    scan_url?: string;


    full_name?: string;


    sexe?: string;
    

    departement?: string;


    statut?: string;


    adresse?: string;
 

    signature?: string;


    created?: Date;


    update_created: Date; 

    entreprise?: string;
    
 
    code_entreprise?: string;

    post?: Poste;
}