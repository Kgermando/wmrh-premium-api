import { IsNotEmpty } from "class-validator";
import { Personnel } from "src/personnel/models/personnel.entity";

export class ApointementCreateDto {
   
    @IsNotEmpty()
    matricule: string;  

    @IsNotEmpty()
    apointement: string;

    @IsNotEmpty()
    prestation: string;

    @IsNotEmpty()
    observation: string;

    @IsNotEmpty()
    date_entree: Date;

    @IsNotEmpty()
    date_sortie: Date;

    personnel: Personnel;

    site_location: string;

    @IsNotEmpty()
    signature: string;  

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created : Date; 

    @IsNotEmpty()
    entreprise: string;
    
    @IsNotEmpty()
    code_entreprise: string; 
}