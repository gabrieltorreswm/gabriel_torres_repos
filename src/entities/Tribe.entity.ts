import { Entity , PrimaryGeneratedColumn , Column, BaseEntity, OneToMany, OneToOne, ManyToOne} from "typeorm";
import { Organization } from "./Organitazion.entity";

@Entity()
export class Tribe extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(() => Organization, (org) => org.tribe)
    id_organization:Organization

    @Column()
    name:string

    @Column()
    status:number
}