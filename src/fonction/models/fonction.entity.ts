import { Departement } from "src/departement/models/departement.entity";
import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('fonctions')
export class Fonction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()    
    fonction: string;

    @OneToMany(() => Personnel, (item) => item.fonctions, {cascade: true})
    personnels: Personnel[];

    @ManyToOne(() => Departement, (dep)=> dep.fonctions, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    departement: Departement;

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