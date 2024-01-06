import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { IndemniteContent } from './models/indemnite-content.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class IndemniteContentService extends AbstractService {
    constructor(
        @InjectRepository(IndemniteContent) private readonly indemniteConentRepository: Repository<IndemniteContent>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(indemniteConentRepository);
    }

    findGetAll(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT *
            FROM indemnite_contents 
            WHERE "indemniteId"='${id}' ORDER BY created ASC;
        `);
    }

    allGet(code_entreprise): Promise<any[]> {
        return this.repository.find({
            relations: [
                'indemnites',
            ],
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
