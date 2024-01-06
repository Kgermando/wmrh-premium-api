import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service'; 
import { Repository } from 'typeorm';
import { Poste } from './models/poste.entity';

@Injectable()
export class PosteService extends AbstractService {
    constructor(
        @InjectRepository(Poste) private readonly posteRepository: Repository<Poste>
    ) {
        super(posteRepository); 
    }

    allGet(code_entreprise): Promise<any[]> {
        return this.repository.find({
            // relations: {
            //     candidatures: true
            // },
            where: {code_entreprise},
            order: {'created': 'DESC'}
        }); 
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                candidatures: true
            }
        })
    }
}
