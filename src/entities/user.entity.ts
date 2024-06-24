// ====== IMPORTS =========
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

enum Roles {
    admin = "admin",
    user = "user"
}

// 1. Define an entity for users 
@Entity({ name: "users", synchronize: true })
export class User {
    @PrimaryGeneratedColumn()
    id: number; // Primary Key

    @Column({ length: 50, unique: true, nullable: false })
    name: string; // User's name

    @Column({ type: "text", nullable: true })
    about: string;

    @Column({ length: 50, unique: true })
    email: string;

    @Column({ type: 'enum', enum: Roles, default: Roles.user })
    role: Roles;
}