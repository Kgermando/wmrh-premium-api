import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Entreprise } from './models/entreprise.entity';

@Injectable()
export class EntrepriseService extends AbstractService {
    constructor(
        @InjectRepository(Entreprise) private readonly serviceRepository: Repository<Entreprise>
    ) {
        super(serviceRepository);
    }

    allGet(): Promise<any[]> {
        return this.repository.find({
            order: {'created': 'DESC'}
        }); 
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                abonnements: true 
            }
        })
    }
}
