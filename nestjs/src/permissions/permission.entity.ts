import { ApiMethod } from 'src/common/enums/api-method.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    method: ApiMethod;

    @Column()
    path: string;

    constructor(partial: Partial<Permission>) {
        Object.assign(this, partial);
    }

}