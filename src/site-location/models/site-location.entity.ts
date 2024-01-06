import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('site_locations')
export class SiteLocation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    site_location: string; // Nom du site 

    @Column()
    manager: string;

    @Column()
    adresse: string;

    @OneToMany(() => Personnel, (item) => item.site_locations, {cascade: true})
    personnels: Personnel[];

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