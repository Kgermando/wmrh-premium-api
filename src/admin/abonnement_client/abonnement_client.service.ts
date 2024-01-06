import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { AbonnementClient } from './models/abonnement_client.entity';

@Injectable()
export class AbonnementClientService extends AbstractService {
    constructor(
        @InjectRepository(AbonnementClient) private readonly serviceRepository: Repository<AbonnementClient>
    ) {
        super(serviceRepository);
    }

    allGet(): Promise<any[]> {
        return this.repository.find({
            relations: {
                entreprise: true
            }, 
            order: {'created': 'DESC'}
        }); 
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                entreprise: true
            }
        })
    }
}
