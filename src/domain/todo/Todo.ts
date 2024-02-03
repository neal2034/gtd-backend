import { AppBaseEntity } from "../AppBaseEntity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../user/User";

@Entity()
export class Todo extends AppBaseEntity {
  @Column()
  name: string;
  @Column("text", { nullable: true })
  description: string;
  @Column({ default: false })
  isDone: boolean;
  @Column("timestamp", { nullable: true })
  doneDate: Date;
  @Column("timestamp", { nullable: true })
  dueDate: Date;
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;
}
