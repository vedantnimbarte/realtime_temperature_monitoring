import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  sr_no: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
  })
  mobile_no: string;

  @Column({
    nullable: false,
  })
  job_title: string;
}
