import { response } from "express";
import { getRepository, getConnection } from "typeorm";
import { Users } from "../entity/Users.entity";

export async function addUser(input) {
  const result = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Users)
    .values({
      name: input.name,
      email: input.email,
      password: input.password,
      mobile_no: input.mobile_no,
      job_title: input.job_title,
    })
    .execute();
  return result;
}

export async function updateUser(input) {
  const result = await getConnection()
    .createQueryBuilder()
    .update(Users)
    .set(input)
    .where(`email = ${input.email}`)
    .execute();
  return result;
}

export async function getAllUsers(input) {
  const repository = getRepository(Users);
  const result = repository.find();
  return result;
}
