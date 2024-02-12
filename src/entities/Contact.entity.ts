import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./Client.entity";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 150 })
  email: string;

  @Column({ length: 13 })
  phoneNumber: string;

  @CreateDateColumn({ type: "date" })
  registeredAt: string;

  @DeleteDateColumn({ type: "date", nullable: true })
  deletedAt: string | null;

  @ManyToOne(() => Client, (client) => client.contacts)
  client: Client;
}
