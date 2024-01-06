export class HoraireUpdateDto { 

    name_horaire?: string; // Horaire 
    
    personnel_shift_1?: string[];
    
    date_shift_1?: string[];

    time_1: string;
    
    personnel_shift_2?: string[];
    
    date_shift_2?: string[];

    time_2: string;
    
    personnel_shift_3?: string[];
    
    date_shift_3?: string[];

    time_3: string;

    signature?: string; 

    created?: Date; 

    update_created: Date; 

    entreprise?: string;
 
    code_entreprise?: string;
}