import { Entity , PrimaryGeneratedColumn , Column, BaseEntity, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import { Tribe } from "./Tribe.entity";

@Entity()
export class Organization extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    status:string

    @OneToMany(type => Tribe, (tribe) => tribe.id_organization, { cascade:true})
    @JoinColumn()
    tribe:Tribe[]
    
}