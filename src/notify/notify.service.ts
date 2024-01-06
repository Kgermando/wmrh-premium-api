import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Notify } from './models/notifiy.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class NotifyService extends AbstractService {
    constructor(
        @InjectRepository(Notify) private readonly notifyRepository: Repository<Notify>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(notifyRepository); 
    }

    allGet(code_entreprise, matricule): Promise<any[]> {
        return this.dataSource.query(`
            SELECT "notifys"."id", "notifys"."is_read", "notifys"."title", 
            "notifys"."route", "notifys"."signature", "notifys"."created", 
            "notifys"."update_created", "notifys"."entreprise", 
            "notifys"."code_entreprise"
            FROM notifys 
            LEFT JOIN "personnels" ON "personnels"."id" = "notifys"."personnelId"
            WHERE
            "notifys"."code_entreprise"='${code_entreprise}' AND
            "personnels"."matricule"='${matricule}' ORDER BY "notifys"."created" DESC;
        `);
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
