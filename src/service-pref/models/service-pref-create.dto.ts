import { IsEmail, IsNotEmpty } from "class-validator";
import { Departement } from "src/departement/models/departement.entity";
import { Personnel } from "src/personnel/models/personnel.entity";

export class ServicePrefCreateDto {
   
    @IsNotEmpty()
    service: string;   

    personnels: Personnel[];

    @IsNotEmpty()
    departement: Departement;

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