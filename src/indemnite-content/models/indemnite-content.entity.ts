import { Indemnite } from "src/indemnite/models/indemnite.entity"; 
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('indemnite_contents')
export class IndemniteContent {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Indemnite, (co)=> co.content, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    indemnite: Indemnite;

    @Column({default: '-'})
    nom: string;

    @Column({default: '0'})
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
 