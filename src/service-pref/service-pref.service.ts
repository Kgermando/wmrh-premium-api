import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Serviceprefs } from './models/service-pref.entity';

@Injectable()
export class ServicePrefService extends AbstractService {
    constructor(
        @InjectRepository(Serviceprefs) private readonly servicePrefRepository: Repository<Serviceprefs>
    ) {
        super(servicePrefRepository); 
    }

    allGet(code_entreprise): Promise<any[]> {
        return this.repository.find({
            relations: {
                personnels: true,
            },
            where: {code_entreprise},
            order: {'created': 'DESC'}
        }); 
    }


    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                personnels: true,
                departement: true,
            }
        })
    } 
}
