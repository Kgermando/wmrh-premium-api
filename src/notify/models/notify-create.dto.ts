import { IsNotEmpty } from "class-validator";
import { Personnel } from "src/personnel/models/personnel.entity";

export class NotifyCreateDto {

    @IsNotEmpty()
    personnel: Personnel;

    @IsNotEmpty()
    is_read: boolean; 

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    route: string; 
 

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