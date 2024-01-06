import { IsEmail, IsNotEmpty } from "class-validator";
import { Poste } from "src/poste/models/poste.entity";

export class CandidatureCreateDto { 
    @IsNotEmpty()
    search_profil: string;

    @IsNotEmpty()
    scan_url: string; 

    @IsNotEmpty()
    full_name: string;

    @IsNotEmpty()
    sexe: string; 

    @IsNotEmpty()
    departement: string; 

    @IsNotEmpty()
    statut: string;

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

    post: Poste;
}