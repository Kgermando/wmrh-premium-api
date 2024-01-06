import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { AvanceSalaire } from './models/avance-salaire.entity';

@Injectable()
export class AvanceSalaireService extends AbstractService {
    constructor(
        @InjectRepository(AvanceSalaire) private readonly fonctionRepository: Repository<AvanceSalaire>
    ) {
        super(fonctionRepository);
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
