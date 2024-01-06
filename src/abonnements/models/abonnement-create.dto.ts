import { IsNotEmpty } from "class-validator"; 

export class AbonnementCreateDto {
    @IsNotEmpty()
    originatingTransactionId: string;

    @IsNotEmpty()
    statusCode: string; 

    @IsNotEmpty()
    statusDescription: string;

    @IsNotEmpty()
    transactionId: string;

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