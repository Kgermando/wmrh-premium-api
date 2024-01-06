import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('avance_salaires')
export class AvanceSalaire {
    @PrimaryGeneratedColumn()
    id: number; 

    @ManyToOne(() => Personnel, (personnel)=> personnel.avances_salaires, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    personnel: Personnel;

    @Column()
    intitule: string; // Prime de travaill, prime de risque, ...

    @Column({default: 'CDF'})
    monnaie: string;

    @Column()
    montant: string;

    @Column()
    observation: string;

    
    @Column()
    signature: string;

    @Column()
    created: Date;

    @Column()
    update_created : Date;

    @Column()
    entreprise: string;
    
    @Column()
    code_entreprise: string;
}