import { IsEmail, IsNotEmpty } from "class-validator";
import { Personnel } from "src/personnel/models/personnel.entity";

export class TitleCreateDto {
   
    @IsNotEmpty()
    title: string;   

    personnels: Personnel[];

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