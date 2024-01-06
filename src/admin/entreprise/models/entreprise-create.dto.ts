import { IsNotEmpty } from "class-validator";
import { AbonnementClient } from "src/admin/abonnement_client/models/abonnement_client.entity";

export class EntrepriseCreateDto {

    logo: string;

    @IsNotEmpty()
    company_name: string;

    @IsNotEmpty()
    nbre_employe: number;

    @IsNotEmpty()
    rccm: string;

    @IsNotEmpty()
    id_nat: string;

    @IsNotEmpty()
    numero_impot: string;

    @IsNotEmpty()
    numero_cnss: string;

    @IsNotEmpty()
    responsable: string;

    @IsNotEmpty()
    telephone: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    adresse: string;

    @IsNotEmpty()
    code_entreprise: string;
 
    @IsNotEmpty()
    statut: boolean; // statut abonnement 

    abonnements: AbonnementClient[];

    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created: Date;
}