import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Horaire } from './models/horaire.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HoraireService extends AbstractService {
    constructor(
        @InjectRepository(Horaire) private readonly horaireRepository: Repository<Horaire>
    ) {
        super(horaireRepository); 
    }

    allGet(code_entreprise): Promise<any[]> {
        return this.repository.find({
            where: {code_entreprise},
            order: {'created': 'DESC'}
        });
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
        })
    }
}
