import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Departement } from './models/departement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartementService extends AbstractService {
    constructor(
        @InjectRepository(Departement) private readonly departementRepository: Repository<Departement>
    ) {
        super(departementRepository); 
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
                fonctions: true,
                services: true,
            }
        })
    }

 }
