import { Personnel } from "src/personnel/models/personnel.entity";

export class PenaliteUpdateDto { 
    personnel?: Personnel;

    intitule?: string;

    monnaie?: string; 

    montant?: string;

    
    signature?: string; 

    created?: Date; 

    update_created: Date; 

    entreprise?: string;
 
    code_entreprise?: string; 
}