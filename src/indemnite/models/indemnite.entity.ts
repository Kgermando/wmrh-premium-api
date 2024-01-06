import { IndemniteContent } from "src/indemnite-content/models/indemnite-content.entity";
import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('indemnites')
export class Indemnite {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Personnel, (co)=> co.indemnites, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    personnel: Personnel;

    @Column({default: '-'})
    intitule: string;

    @Column({default: 'En attente'})
    statut: string;

    @Column({default: 'CDF'})
    monnaie: string;

    @Column({default: '0'})
    taux_dollard: string;

    @OneToMany(() => IndemniteContent, (item) => item.indemnite, {cascade: true})
    content: IndemniteContent[];

    @Column({default: '0'})
    total_a_payer: string;
 
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