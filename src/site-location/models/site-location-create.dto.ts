import { IsNotEmpty } from "class-validator";
import { Personnel } from "src/personnel/models/personnel.entity";

export class SiteLocationCreateDto {
   
    @IsNotEmpty()
    site_location: string;  

    @IsNotEmpty()
    manager: string;

    @IsNotEmpty()
    adresse: string; 

    personnels: Personnel[];

    @IsNotEmpty()
    signature: string;  

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created: Date; 

    @IsNotEmpty()
    entreprise: string;
    
    @IsNotEmpty()
    code_entreprise: string; 
}