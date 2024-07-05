// ====== IMPORTS =========
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
// ====== OTHER ENTITIES =========
import { Generic as GenericEntity } from "./generic.entity";

@Entity({ name: "files", synchronize: false })
export class File extends GenericEntity { }