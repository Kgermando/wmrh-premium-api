import { AbonnementClient } from "src/admin/abonnement_client/models/abonnement_client.entity";

export class EntrepriseUpdateDto {
    logo?: string;
    company_name?: string;
    nbre_employe?: number; 
    rccm?: string; 
    id_nat?: string;
    numero_impot?: string;
    numero_cnss?: string;
    responsable?: string; 
    telephone?: string; 
    email?: string; 
    adresse?: string;
    code_entreprise?: string;
    statut?: boolean; // statut abonnement 
    abonnements?: AbonnementClient[]; 
    signature?: string; 
    created?: Date; 
    update_created?: Date;
}