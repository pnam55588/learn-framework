import { Role } from 'src/roles/role.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BeforeInsert,
    BeforeUpdate,
    PrimaryColumn,
    ManyToOne,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Entity({ name: 'users' })
export class User {
    @PrimaryColumn()
    id: string;
    @Column({ nullable: false })
    username: string;
    @Column({ nullable: false })
    password: string;
    @Column({ unique: true, nullable: false })
    email: string;
    @ManyToOne(() => Role, (role) => role.id, { eager: true })
    role: Role;
    @Column({ nullable: true, default: false })
    disabled: boolean;
    @Column()
    created_at: Date;
    @Column()
    updated_at: Date;
    @BeforeInsert()
    beforeInsert() {
        this.id = this.generateCustomUserId();
        this.created_at = new Date();
        this.updated_at = new Date();
    }
    @BeforeUpdate()
    beforeUpdate() {
        this.updated_at = new Date();
    }
    generateCustomUserId(): string {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = String(now.getFullYear()).slice(-2); // Last two digits of the year
        const uniqueNumber = Math.floor(100 + Math.random() * 900); // Generate a random 3-digit number

        return `user${day}${month}${year}${uniqueNumber}`;
    }

    constructor(
        userName: string,
        password: string,
        email: string,
        role: Role,
    ) {
        this.username = userName;
        this.password = password;
        this.email = email;
        this.role = role;
    }
}
