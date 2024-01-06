import { Personnel } from "src/personnel/models/personnel.entity";

export class ApointementUpdateDto {

    matricule?: string;

    apointement?: string;

    prestation?: string; // Journée entiere ou demi-journée

    observation?: string;

    date_entree?: Date;

    date_sortie?: Date;

    personnel?: Personnel;

    site_location?: string;

    signature?: string;

    created?: Date;

    update_created: Date;  
}