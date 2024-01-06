import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Indemnite } from './models/indemnite.entity';

@Injectable()
export class IndemniteService extends AbstractService {
    constructor(
        @InjectRepository(Indemnite) private readonly indemniteRepository: Repository<Indemnite>
    ) {
        super(indemniteRepository);
    }

    allGet(code_entreprise): Promise<any[]> {
        return this.repository.find({
            relations: [
                'personnel',
                'personnel.departements',
            ],
            where: {code_entreprise},
            order: {'created': 'DESC'}
        });
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: [
                'personnel',
                'personnel.departements',
                'content',
            ],
        })
    }

}
