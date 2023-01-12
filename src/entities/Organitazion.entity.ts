import { Entity , PrimaryGeneratedColumn , Column, BaseEntity} from "typeorm";

@Entity()
export class Organization extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    status:string
}