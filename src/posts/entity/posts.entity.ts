import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostTable{
    @PrimaryGeneratedColumn()
    public id : number;

    @Column()
    public content: string;

    @Column()
    public title: string;
}

