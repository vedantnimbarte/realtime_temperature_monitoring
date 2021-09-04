import { time } from "console";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Temperature {
  @PrimaryGeneratedColumn()
  sr_no: number;

  @Column({
    nullable: false,
  })
  device_id: string;

  @Column({
    nullable: false,
  })
  temp1: string;

  @Column({
    nullable: false,
  })
  temp2: string;

  @Column({
    nullable: false,
  })
  date: string;

  @Column({
    nullable: false,
  })
  time: string;
}
