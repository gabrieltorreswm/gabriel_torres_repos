import { Entity , PrimaryGeneratedColumn , Column, BaseEntity, OneToMany, Timestamp, ManyToOne} from "typeorm";
import { Tribe } from "./Tribe.entity";

@Entity()
export class Repository extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(() => Tribe, (trb) => trb.id)
    id_tribu:Tribe

    @Column()
    name:string

    @Column()
    state:string

    @Column({type:'timestamp', nullable:true})
    create_time:string

    @Column()
    status:string
}