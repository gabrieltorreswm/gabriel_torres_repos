import { Entity , Column, BaseEntity, OneToOne, PrimaryGeneratedColumn, JoinColumn,} from "typeorm";
import { Repository } from "./Repository.entity";

@Entity()
export class Metrics extends BaseEntity{

    @PrimaryGeneratedColumn()
    id_repository:number

    @Column()
    coverega:number

    @Column()
    bugs:number

    @Column()
    vulnerabilities:number

    @Column()
    code_smells:number

    @Column()
    hotspot: number

}