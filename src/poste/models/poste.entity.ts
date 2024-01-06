import { Candidature } from "src/candidature/models/candidature.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('postes')
export class Poste {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    search_profil: string; // Profil rechercher

    @Column()
    resume: string;    

    @Column()
    type_contrat: string;  

    @Column()
    statut: string;  // Offre disponible True or false

    @Column()
    echeance: Date;

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

    @OneToMany(() => Candidature, (item) => item.post, {nullable: false}) 
    candidatures: Candidature[];


}