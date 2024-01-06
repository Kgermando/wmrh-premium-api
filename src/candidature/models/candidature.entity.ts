import { Poste } from "src/poste/models/poste.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('candidatures')
export class Candidature {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    search_profil: string; // Profil rechercher

    @Column()
    scan_url: string;

    @Column()
    full_name: string;

    @Column()
    sexe: string;

    @Column()
    departement: string;

    @Column()
    statut: string; 

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

    @ManyToOne(() => Poste, (poste)=> poste.candidatures)
    post: Poste;
}