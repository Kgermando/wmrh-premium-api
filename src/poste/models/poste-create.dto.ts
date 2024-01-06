import { IsEmail, IsNotEmpty } from "class-validator";
import { Candidature } from "src/candidature/models/candidature.entity";

export class PosteCreateDto {

    @IsNotEmpty()
    search_profil: string;  

    @IsNotEmpty()
    resume: string; 

    @IsNotEmpty()
    type_contrat: string;

    @IsNotEmpty() 
    statut: string;

    @IsNotEmpty()
    echeance: Date;

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

    candidatures: Candidature[];

}