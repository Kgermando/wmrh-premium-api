import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginatedResult } from './paginated_result.interface';

@Injectable()
export abstract class AbstractService {

   protected constructor(
    protected readonly repository: Repository<any>
   ) {}


   all(code_entreprise): Promise<any[]> {
        return this.repository.find({where: {code_entreprise}, order: {'created': 'DESC'}}); 
    }

    async paginate(page: number = 1, code_entreprise): Promise<PaginatedResult> {
        const take = 15;

        const [data, total] = await this.repository.findAndCount({
            where: {code_entreprise},
            take,
            skip: (page - 1) * take
        });
        return {
            data: data,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        }
    } 

    async create(data): Promise<any> {
        return this.repository.save(data);
    }

    async findOne(condition): Promise<any> {
        return await this.repository.findOne(condition)
    }

    async update(id: number, data): Promise<any> {
        return this.repository.update(id, data);
    }

    async delete(id: number): Promise<any> {
        return this.repository.delete(id);
    }
}
