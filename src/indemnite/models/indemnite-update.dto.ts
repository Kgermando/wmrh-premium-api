import { IndemniteContent } from "src/indemnite-content/models/indemnite-content.entity";
import { Personnel } from "src/personnel/models/personnel.entity";   

export class IndemniteUpdateDto {
 
    personnel: Personnel; 

    intitule?: string;
    
    statut?: string;

    monnaie?: string;
 
    taux_dollard?: string;

    content?: IndemniteContent[];

    total_a_payer?: string;

    signature?: string;  
 
    created?: Date;
 
    update_created?: Date;
 
    entreprise?: string;
 
    code_entreprise?: string;
}