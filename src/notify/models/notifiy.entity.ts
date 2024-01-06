import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('notifys')
export class Notify {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Personnel, (personnel)=> personnel.penalites, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    personnel: Personnel;

    @Column()
    is_read: boolean; // Permet de savoir si cette element est ouvert

    @Column()
    title: string; // Titre de l'élément à notifier

    @Column()
    route: string; // Permet de rediriger directement

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