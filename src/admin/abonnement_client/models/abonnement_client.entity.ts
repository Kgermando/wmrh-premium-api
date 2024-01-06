import { Entreprise } from "src/admin/entreprise/models/entreprise.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('abonnements_clients')
export class AbonnementClient {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Entreprise, (val)=> val.abonnements, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    entreprise: Entreprise;

    @Column({default: 'USD'})
    devise: string;

    @Column({default: '0'})
    taux_devise: string;

    @Column({default: '1'})
    montant: string;

    @Column()
    reference: string; // N° de reference de paiment

    @Column()
    responsable: string; // Celui qui a effectué le paiement

    @Column()
    bouquet: string; // Starter, Standard, Plus, Entreprise

    @Column()
    dure_paiement: string; // 1Mois, 3Mois, 6Mois, 1AN, 3ANS

    @Column()
    bordereau: string;

    @Column()
    signature: string;  // Celui qui a remplie cette fiche

    @Column()
    created: Date;

    @Column()
    update_created: Date;

   
}