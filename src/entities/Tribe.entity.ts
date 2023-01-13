import { Entity , PrimaryGeneratedColumn , Column, BaseEntity, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import { Organization } from "./Organitazion.entity";
import { Repository } from "./Repository.entity";

@Entity()
export class Tribe extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(() => Organization, (org) => org.tribe)
    @JoinColumn()
    id_organization:Organization

    @Column()
    name:string

    @Column()
    status:number

    @OneToMany(type => Repository, (rep) => rep.id_tribu, { cascade:true })
    repository:Repository[]
}