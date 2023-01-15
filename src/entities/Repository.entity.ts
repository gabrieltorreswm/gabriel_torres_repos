import { Entity , PrimaryGeneratedColumn , Column, BaseEntity, OneToMany, Timestamp, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { Metrics } from "./Metrics.entity";
import { Tribe } from "./Tribe.entity";

@Entity()
export class Repository extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(() => Tribe, (trb) => trb.id, { nullable:true})
    @JoinColumn()
    id_tribu:Tribe

    @Column()
    name:string

    @Column()
    state:string

    @Column({type:'timestamp', nullable:true})
    create_time:string

    @Column()
    status:string

    @OneToOne(()=> Metrics)
    @JoinColumn()
    metrics:Metrics 
}