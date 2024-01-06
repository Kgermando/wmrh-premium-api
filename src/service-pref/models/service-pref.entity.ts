import { Departement } from "src/departement/models/departement.entity";
import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('serviceprefs')
export class Serviceprefs {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    service: string;

    @OneToMany(() => Personnel, (item) => item.services, {cascade: true})
    personnels: Personnel[];

    @ManyToOne(() => Departement, (dep)=> dep.services, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
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