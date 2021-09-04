import { getConnection } from "typeorm";
import { Temperature } from "../entity/temperature.entity";

export async function insert(input) {
  const result = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Temperature)
    .values({
      device_id: input.device_id,
      temp1: input.temp1,
      temp2: input.temp2,
      date: input.date,
      time: input.time,
    })
    .execute();
  return result;
}
