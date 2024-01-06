import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { PaiementDto } from './models/paiement.dto';
import { Observable } from 'rxjs';
import { AbstractService } from 'src/common/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Abonnement } from './models/abonnement.entity';

@Injectable()
export class AbonnementsService extends AbstractService {

    constructor(
        private readonly httpService: HttpService,
        @InjectRepository(Abonnement) private readonly abonnementRepository: Repository<Abonnement>
        ) {
        super(abonnementRepository);
    }
 

    async payment(data): Promise<any> {
        let endPoint = "https://marchand.maishapay.online/api/payment/rest/vers1.0/merchant";
        return this.httpService.post(endPoint, data);
    }
}
