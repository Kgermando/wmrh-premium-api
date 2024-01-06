import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('pres_entreprises')
export class PresEntreprise {
    @PrimaryGeneratedColumn()
    id: number;  

    @ManyToOne(() => Personnel, (personnel)=> personnel.pres_entreprises, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    personnel: Personnel;

    @Column()
    intitule: string; // Objet de l'empreint

    @Column({default: 'CDF'})
    monnaie: string; // Monnaie de l'empreint

    @Column({default: '0'})
    total_empreints: string;  // Près de l'entreprise 

    @Column({default: '0'})
    deboursement: string; // Montant à debourser par mois 

    @Column({default: new Date()})
    date_debut: Date;

    @Column()
    date_limit: Date;  // Date de dernier remboursement

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