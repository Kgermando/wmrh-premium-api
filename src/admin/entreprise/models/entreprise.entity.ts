import { AbonnementClient } from "src/admin/abonnement_client/models/abonnement_client.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('entreprises')
export class Entreprise {

    @PrimaryGeneratedColumn()
    id: number; 

    @Column({default: '-'})
    logo: string;

    @Column()
    company_name: string;

    @Column({default: 0})
    nbre_employe: number;

    @Column({default: '-'})
    rccm: string;

    @Column({default: '-'})
    id_nat: string;

    @Column({default: '-'})
    numero_impot: string;

    @Column({default: '-'})
    numero_cnss: string;

    @Column({default: '-'})
    responsable: string;

    @Column()
    telephone: string;

    @Column()
    email: string;

    @Column()
    adresse: string;

    @Column()
    code_entreprise: string;

    @Column({default: false})
    statut: boolean; // statut abonnement

    @OneToMany(() => AbonnementClient, (item) => item.entreprise, {cascade: true})
    abonnements: AbonnementClient[];

    @Column()
    signature: string;

    @Column()
    created: Date;

    @Column()
    update_created: Date;

}