import { Entity , PrimaryGeneratedColumn , Column, BaseEntity, OneToMany} from "typeorm";
import { Organization } from "./Organitazion.entity";

@Entity()
export class Tribe extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @OneToMany(() => Organization, (org) => org.id)
    id_organization:number

    @Column()
    name:string

    @Column()
    status:number
}