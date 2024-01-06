import { IsNotEmpty } from "class-validator";
import { Entreprise } from "src/admin/entreprise/models/entreprise.entity"; 

export class AbonnementClientCreateDto {

    @IsNotEmpty()
    entreprise: Entreprise;

    @IsNotEmpty()
    devise: string;

    @IsNotEmpty()
    taux_devise: string;

    @IsNotEmpty()
    montant: string;

    @IsNotEmpty()
    reference: string; // N° de reference de paiment

    @IsNotEmpty()
    responsable: string; // Celui qui a effectué le paiement

    @IsNotEmpty()
    bouquet: string; // Starter, Standard, Plus, Entreprise

    @IsNotEmpty()
    dure_paiement: string; // 1Mois, 3Mois, 6Mois, 1AN, 3ANS

    bordereau: string;

    @IsNotEmpty()
    signature: string;  // Celui qui a remplie cette fiche

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created: Date;
}