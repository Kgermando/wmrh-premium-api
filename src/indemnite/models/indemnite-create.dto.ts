import { IsNotEmpty } from "class-validator";
import { IndemniteContent } from "src/indemnite-content/models/indemnite-content.entity";
import { Personnel } from "src/personnel/models/personnel.entity";  

export class IndemniteCreateDto {

    personnel: Personnel; 

    intitule: string;

    @IsNotEmpty()
    statut: string;

    monnaie: string;
 
    taux_dollard: string;

    content: IndemniteContent[];

    total_a_payer: string;

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