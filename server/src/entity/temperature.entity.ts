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
  material_type: string;

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

  @Column({
    nullable: false,
  })
  min_temp: string;

  @Column({
    nullable: false,
  })
  max_temp: string;

  @Column({
    default: 0,
  })
  min_temp_status: string;

  @Column({
    default: 0,
  })
  max_temp_status: string;

  @Column({
    default: 0,
  })
  error_code: string;
}
