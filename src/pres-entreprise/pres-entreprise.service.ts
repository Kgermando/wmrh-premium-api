import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { PresEntreprise } from './models/pres-entreprise.entity';

@Injectable()
export class PresEntrepriseService extends AbstractService {
    constructor(
        @InjectRepository(PresEntreprise) private readonly preEntrepriseRepository: Repository<PresEntreprise>
    ) {
        super(preEntrepriseRepository); 
    }

    allGet(code_entreprise): Promise<any[]> {
        return this.repository.find({
            relations: {
                personnel: true
            },
            where: {code_entreprise},
            order: {'created': 'DESC'}
        }); 
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                personnel: true
            }
        })
    }
}
