import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service'; 
import { Repository } from 'typeorm';
import { SiteLocation } from './models/site-location.entity';


@Injectable()
export class SiteLocationService extends AbstractService {
    constructor(
        @InjectRepository(SiteLocation) private readonly siteLocationRepository: Repository<SiteLocation>
    ) {
        super(siteLocationRepository); 
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
            }
        })
    } 
}
