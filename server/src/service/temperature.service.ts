import { getConnection, getRepository, Between, Like } from "typeorm";
import { Temperature } from "../entity/temperature.entity";
import * as moment from "moment";

function serializeDate(input_date: string) {
  let date;
  date = moment(input_date, "DD MMM YYYY").format("L");
  date = date.split("/");
  const day = date[1]
  const month = date[0]
  const year = date[2]
  return `${day}/${month}/${year}`
}

export async function insert(input) {
  const result = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Temperature)
    .values({
      device_id: input.device_id,
      temp1: input.temp1,
      temp2: input.temp2,
      date: serializeDate(input.date),
      time: input.time,
      min_temp: input.min_temp,
      max_temp: input.max_temp,
      min_temp_status: input.min_temp_status,
      max_temp_status: input.max_temp_status,
      material_type: input.material_type,
      error_code: input.error_code,
      machine_status: input.machine_status,
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
      "error_code",
      "machine_status",
    ],
    where: { device_id: input.device_id },
  });
  return result;
}

export async function getAllData(input) {
  let result;
  const { from_date, to_date, material_type, filter } = input;
  const repository = await getRepository(Temperature);
  if (material_type == "both" && filter == "all") {
    result = await repository.find({
      where: {
        date: Between(serializeDate(input.from_date), serializeDate(input.to_date)),
      },
    });
  } else if (material_type == "both") {
    result = await repository.find({
      select: [
        "sr_no",
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
        "error_code",
        "machine_status",
      ],
      where: {
        date: Between(serializeDate(input.from_date), serializeDate(input.to_date)),
        min_temp_status: input.filter == "min" ? "1" : "0",
        max_temp_status: input.filter == "max" ? "1" : "0",
      },
    });
  } else if (filter == "all") {
    result = await repository.find({
      select: [
        "sr_no",
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
        "error_code",
        "machine_status",
      ],
      where: {
        material_type: input.material_type,
        date: Between(serializeDate(input.from_date), serializeDate(input.to_date)),
      },
    });
  } else {
    result = await repository.find({
      select: [
        "sr_no",
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
        "error_code",
        "machine_status",
      ],
      where: {
        material_type: input.material_type,
        date: Between(serializeDate(input.from_date), serializeDate(input.to_date)),
        min_temp_status: input.filter == "min" ? "1" : "0",
        max_temp_status: input.filter == "max" ? "1" : "0",
      },
    });
  }
  return result;
}

export async function getTempStatus(input) {
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
      "error_code",
      "machine_status",
    ],
    where: {
      device_id: input.device_id,
      date: input.date,
      error_code: input.error_code,
    },
    order: {
      date: "DESC",
    },
  });
  return result;
}

export async function getMinTemp(input) {
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
      "machine_status",
    ],
    where: {
      device_id: input.device_id,
      min_temp_status: input.min_temp_status,
    },
  });
  return result;
}

export async function getMaxTemp(input) {
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
      "machine_status",
    ],
    where: {
      device_id: input.device_id,
      max_temp_status: input.max_temp_status,
    },
  });
  return result;
}

export async function getDataFromDateToDate(input) {
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
      "error_code",
      "machine_status",
    ],
    where: {
      device_id: input.device_id,
      date: Between(serializeDate(input.from_date), serializeDate(input.to_date)),
      machine_status: "ON",
    },
  });
  return result;
}

export async function getDataByDate(input) {
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
      "error_code",
      "machine_status",
    ],
    where: {
      device_id: input.device_id,
      date: serializeDate(input.date),
      machine_status: "ON",
    },
  });

  return result;
}

export async function getDataByMonthAndYear(input) {
 
  let monthNumber = moment().month(input.month).format("M");
  let monthAndYear = monthNumber + "/" + input.year;
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
      "error_code",
      "machine_status",
    ],
    where: {
      device_id: input.device_id,
      date: Like(`%${monthAndYear}`),
      machine_status: "ON",
    },
  });

  return result;
}

export async function getLiveData() {
  const repository = await getRepository(Temperature);
  const result = await repository.find({
    order: { sr_no: "DESC" },
    take: 1,
  });

  return result;
}
