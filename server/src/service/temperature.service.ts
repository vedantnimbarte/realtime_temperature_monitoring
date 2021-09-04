import { getConnection, getRepository } from "typeorm";
import { Temperature } from "../entity/temperature.entity";
import log from "../logger";

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
      min_temp: input.min_temp,
      max_temp: input.max_temp,
      min_temp_status: input.min_temp_status,
      max_temp_status: input.max_temp_status,
    })
    .execute();
  return result;
}

export async function get(input) {
  const repository = await getRepository(Temperature);
  const result = await repository.find({
    select: [
      "device_id",
      "temp1",
      "temp2",
      "date",
      "time",
      "min_temp",
      "max_temp",
      "min_temp_status",
      "max_temp_status",
      "material_type",
    ],
    where: { device_id: input.device_id },
  });
  return result;
}
