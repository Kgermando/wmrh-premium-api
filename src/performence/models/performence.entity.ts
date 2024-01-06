import { DecimalTransformer } from "src/decimal.transformer";
import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('performences')
export class Performence {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Personnel, (personnel)=> personnel.performences, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    personnel: Personnel;

    @Column({default: 0})
    ponctualite: number;

    @Column({default: 0})
    hospitalite: number;

    @Column({default: 0})
    travail: number;

    @Column()    
    observation: string;

    @Column()
    signature: string;

    @Column()
    created: Date;

    @Column()
    update_created: Date;

    @Column()
    entreprise: string;
    
    @Column()
    code_entreprise: string; 
}