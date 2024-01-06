import { IsNotEmpty } from "class-validator";
import { Indemnite } from "src/indemnite/models/indemnite.entity";

export class IndemniteContentCreateDto {

    indemnite: Indemnite; 

    @IsNotEmpty()
    nom: string; 

    @IsNotEmpty()
    montant: string; 

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