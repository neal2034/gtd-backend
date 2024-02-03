import { AppBaseEntity } from "../AppBaseEntity";
import { BeforeInsert, Column, Entity } from "typeorm";
import { saltPassword } from "../../util/encrypt";
import { Exclude } from "class-transformer";

@Entity()
export class User extends AppBaseEntity {
  @Column()
  username: string;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @BeforeInsert()
  async beforeInsert() {
    if (this.password) {
      this.password = await saltPassword(this.password);
    }
  }
}
