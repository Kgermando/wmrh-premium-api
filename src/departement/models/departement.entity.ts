import { Fonction } from "src/fonction/models/fonction.entity";
import { Personnel } from "src/personnel/models/personnel.entity";
import { Serviceprefs } from "src/service-pref/models/service-pref.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('departements')
export class Departement {

    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    departement: string; // Commercial

    @OneToMany(() => Personnel, (item) => item.departements, {cascade: true})
    personnels: Personnel[];

    @OneToMany(() => Serviceprefs, (item) => item.departement, {cascade: true})
    services: Serviceprefs[];

    @OneToMany(() => Fonction, (item) => item.departement, {cascade: true})
    fonctions: Fonction[];

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