import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('salaires')
export class Salaire {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Personnel, (personnel)=> personnel.salaires, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    personnel: Personnel;

    @Column({default: '-'})
    departement: string;

    @Column({default: '-'})
    fonction: string;

    @Column({default: '-'})
    title: string;

    @Column({default: '-'})
    service: string;

    @Column({default: '-'})
    site_location: string;

    @Column({default: 'CDF'})
    monnaie: string;

    @Column()
    taux_dollard: string;

    @Column({default: 0})
    nbr_dependants: number;

    @Column({default: '0'})
    alloc_logement: string;

    @Column({default: '0'})
    alloc_transport: string;

    @Column({default: '0'})
    alloc_familliale: string;

    @Column({default: '0'})
    soins_medicaux: string;
 
    @Column({default: '0'})
    salaire_base: string;  // Par jour 

    @Column({default: '0'})
    primes: string;

    @Column({default: 0})
    anciennete_nbr_age: number;

    @Column({default: '0'})
    prime_anciennete: string;

    @Column({default: 0})
    heures_supp: number;

    @Column({default: '0'})
    heure_supplementaire_monnaie: string;  

    @Column({default: 0})
    conge_paye: number;

    @Column({default: 26})
    nbre_jrs_preste: string; // Nombre de jours presents

    @Column({default: 0})
    nbre_jrs_ferie: number; // Nombre de jours ferié dans le mois en cours

    @Column({default: '0'})
    rbi: string;  // Remuneration brute imposable

    @Column({default: '0'})
    cnss_qpo: string; // Impôt de 5% => 0.05

    @Column({default: '0'})
    rni: string;  // Remuneration Nette Imposable 

    @Column({default: '0'})
    ipr: string;  // Impôt Professionnel sur les Rémunérations (IPR)

    @Column({default: '0'})
    impot_elide: string; // Economie de l'impôt ce qui sera sanctionné
    
    @Column({default: '0'})
    syndicat: string;  // 1 % 
 
    @Column({default: '0'})
    penalites: string;  // Sanctions sur le salaire net à payer

    @Column({default: '0'})
    avance_slaire: string;

    @Column({default: '0'})
    prise_en_charge_frais_bancaire: string;
    
    @Column({default: '0'})
    pres_entreprise: string;

    @Column({default: '0'})
    net_a_payer: string;

    @Column()
    statut: string; // Pending, Generated

    @Column({default: new Date()})
    date_paie: Date; // Le  mois du bulletin deja généré

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