import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AbonnementsService } from './abonnements.service';
import { PaiementDto } from './models/paiement.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('abonnements')
export class AbonnementsController {

    constructor(private abonnentService: AbonnementsService) {}

    @Post('payement')
    async payment(
        @Body() body: PaiementDto
    ) {
        return this.abonnentService.payment(body);
    }


}
