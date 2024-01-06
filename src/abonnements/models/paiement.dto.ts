import { IsNotEmpty } from "class-validator";

export class PaiementDto {

    @IsNotEmpty()
    gatewayMode: number;

    @IsNotEmpty()
    publicApiKey: string;

    @IsNotEmpty()
    secretApiKey: string;

    @IsNotEmpty()
    transactionReference: string;

    @IsNotEmpty()
    amount: string;

    @IsNotEmpty()
    currency: string;

    // @IsNotEmpty()
    customerFullName: string;

    // @IsNotEmpty()
    customerPhoneNumber: string;

    // @IsNotEmpty()
    customerEmailAddress: string;

    @IsNotEmpty()
    chanel: string;

    @IsNotEmpty()
    provider: string;

    @IsNotEmpty()
    walletID: string;


    // "gatewayMode": 0, // required, 0 : SandBox 1 : Live
    // "publicApiKey": "MP-SBPK-xxxxxxx", // required,
    // "secretApiKey" : "MP-SBSK-wwwwww", // required
    // "transactionReference": "ABCD", // required
    // "amount":{double}, // required
    // "currency" : "{USD, CDF,USD, CDF, FCFA, EURO}", // required USD, CDF, FCFA, EURO
    // "customerFullName": "Jhon DOe", // nullable
    // "customerPhoneNumber" : "+243xxxxxxxxx", // nullable
    // "customerEmailAddress" : null, // nullable
    // "chanel":"MOBILEMONEY", // required MOBILEMONEY
    // "provider": "MPESA", // required MPESA, ORANGE, AITEL, AFRICEL, MTN
    // "walletID" :"+24381xxxxx" // required

}