import { Entity , Column, BaseEntity, OneToOne, PrimaryColumn,} from "typeorm";
import { Repository } from "./Repository.entity";

@Entity()
export class Metrics extends BaseEntity{

    @PrimaryColumn()
    id_repository:number

    @OneToOne(()=> Metrics)
    metrics:Metrics

    @Column()
    coverega:number

    @Column()
    bugs:number

    @Column()
    vulnerabilities:number

    @Column()
    code_smells:number

}