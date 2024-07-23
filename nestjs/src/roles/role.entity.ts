import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'roles'})
export class Role {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique: true, nullable: false})
    name: string;

    @Column({nullable: true, default: false})
    disabled: boolean;
    
    constructor(name: string, disabled: boolean = false) {
        this.name = name;
        this.disabled = disabled;
    }
    

}