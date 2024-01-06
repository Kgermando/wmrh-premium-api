import { IsNotEmpty } from "class-validator";
import { Personnel } from "src/personnel/models/personnel.entity";

 

export class PresEntrepriseCreateDto { 
    @IsNotEmpty()
    personnel: Personnel;

    @IsNotEmpty()
    intitule: string; // Objet de l'empreint

    @IsNotEmpty()
    monnaie: string;

    @IsNotEmpty()
    total_empreints: string;  // Près de l'entreprise 

    @IsNotEmpty()
    deboursement: string; // Montant à debourser par mois

    @IsNotEmpty()
    date_debut: Date;

    @IsNotEmpty()
    date_limit: Date;  // Date de dernier remboursement

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