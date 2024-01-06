import { Indemnite } from "src/indemnite/models/indemnite.entity";

export class IndemniteContentUpdateDto {

    indemnite?: Indemnite;

    nom?: string;
    
    montant?: string;
    
    signature?: string;  
 
    created?: Date;
 
    update_created?: Date;
 
    entreprise?: string;
 
    code_entreprise?: string;
}