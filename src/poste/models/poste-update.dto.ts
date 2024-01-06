import { Candidature } from "src/candidature/models/candidature.entity";

export class PosteUpdateDto {

    search_profil?: string; 

    resume?: string;  

    type_contrat?: string; 

    statut?: string;

    echeance?: Date;

    signature?: string; 

    created?: Date;
 
    update_created: Date;

    entreprise?: string;
    
 
    code_entreprise?: string;

    candidatures?: Candidature[];
}