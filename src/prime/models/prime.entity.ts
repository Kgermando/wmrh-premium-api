import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('primes')
export class Prime {

    @PrimaryGeneratedColumn()
    id: number; 

    @ManyToOne(() => Personnel, (personnel)=> personnel.primes, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    personnel: Personnel;

    @Column()
    intitule: string; // Prime de travaill, prime de risque, ...

    @Column({default: 'CDF'})
    monnaie: string; // Monnaie de l'empreint

    @Column()
    montant: string; 

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