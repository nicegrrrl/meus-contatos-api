import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contact } from "./Contact.entity";
import { getRounds, hashSync } from "bcryptjs";

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ length: 120 })
  password: string;

  @Column({ length: 13 })
  phoneNumber: string;

  @Column({ default: false })
  admin: boolean;

  @CreateDateColumn({ type: "date" })
  registeredAt: string;

  @DeleteDateColumn({ type: "date", nullable: true })
  deletedAt: string | null;

  @OneToMany(() => Contact, (contacts) => contacts.client)
  contacts: Contact[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const hasRounds: number = getRounds(this.password);

    if (!hasRounds) {
      this.password = hashSync(this.password, 10);
    }
  }
}
