import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Preference } from './models/preference.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PreferenceService extends AbstractService {
    constructor(
        @InjectRepository(Preference) private readonly preferenceRepository: Repository<Preference>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(preferenceRepository); 
    } 

    all(): Promise<any[]> {
        return this.repository.find({
            relations: {
                company: true
            }
        }); 
    }

    async preference(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                company: true
            }
        })
    }

    async updatePref(condition, data): Promise<any> {
        return this.repository.update(condition, data);
    }
}
