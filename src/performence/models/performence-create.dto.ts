import { IsNotEmpty } from "class-validator"; 
import { Personnel } from "src/personnel/models/personnel.entity";

export class PerformenceCreateDto { 

    @IsNotEmpty()
    personnel: Personnel;
    
    @IsNotEmpty()
    ponctualite: number;

    @IsNotEmpty()
    hospitalite: number;

    @IsNotEmpty()
    travail: number; 

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