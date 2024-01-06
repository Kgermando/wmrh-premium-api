import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('abonnements')
export class Abonnement {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    originating_transaction_id: string;

    @Column()
    status_code: string;

    @Column()
    status_description: string;

    @Column()
    transaction_id: string;

    @Column()
    validite: string;  // Mois (30jrs), Annee (360jrs), trois ans (1080jrs)

    @Column()
    durre_validite: Date; // Date échéance

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