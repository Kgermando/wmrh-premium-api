import { IsNotEmpty } from "class-validator";
import { Personnel } from "src/personnel/models/personnel.entity";

export class AvanceSalaireCreateDto {
    @IsNotEmpty()
    personnel: Personnel;

    @IsNotEmpty()
    intitule: string; 

    @IsNotEmpty()
    monnaie: string;

    @IsNotEmpty()
    montant: string; 

    @IsNotEmpty()
    observation: string; 

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