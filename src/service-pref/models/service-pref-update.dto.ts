import { Departement } from "src/departement/models/departement.entity";
import { Personnel } from "src/personnel/models/personnel.entity";

export class ServicePrefUpdateDto {

    service?: string; 


    personnels?: Personnel[];

    departement?: Departement;


    signature?: string;


    created?: Date;


    update_created: Date;

    entreprise?: string;
    
 
    code_entreprise?: string; 
}