import { Personnel } from "src/personnel/models/personnel.entity"; 

export class PerformenceUpdateDto { 
    personnel?: Personnel; 
    ponctualite?: number; 
    hospitalite?: number; 
    travail?: number; 
    observation?: string; 
    signature?: string;  
    created?: Date;  
    update_created: Date;  
    entreprise?: string; 
    code_entreprise?: string;
}