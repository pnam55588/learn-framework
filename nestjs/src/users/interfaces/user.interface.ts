import { Role } from "src/roles/role.entity";

export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    role: Role;
    created_at?: Date;
    updated_at?: Date;
}

