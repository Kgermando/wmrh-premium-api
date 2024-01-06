import { IsNotEmpty } from "class-validator";
import { Personnel } from "src/personnel/models/personnel.entity";

export class HeureSuppCreateDto {

    @IsNotEmpty()
    motif: string; 

    @IsNotEmpty()
    nbr_heures: number; 

    @IsNotEmpty()
    personnel: Personnel;

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