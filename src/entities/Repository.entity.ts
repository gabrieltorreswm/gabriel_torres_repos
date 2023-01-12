import { Entity , PrimaryGeneratedColumn , Column, BaseEntity, OneToMany, Timestamp} from "typeorm";
import { Tribe } from "./Tribe.entity";

@Entity()
export class Repository extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @OneToMany(() => Tribe, (trb) => trb.id)
    id_tribu:number

    @Column()
    name:string

    @Column()
    state:string

    @Column({type:'timestamp'})
    create_time:string

    @Column()
    status:string
}