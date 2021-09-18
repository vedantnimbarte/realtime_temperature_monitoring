import { getRepository, getConnection } from "typeorm";
import { Users } from "../entity/Users.entity";

export async function emailVerify(input) {
  const repository = await getRepository(Users);
  const result = await repository.find({
    where: {
      email: input.email,
    },
  });
  console.log(result);
  let result_length = Object.keys(result).length;
  return result_length > 0 ? true : false;
}

export async function mobileVerify(input) {
  const repository = await getRepository(Users);
  const result = await repository.find({
    where: {
      mobile_no: input.mobile_no,
    },
  });
  let result_length = Object.keys(result).length;
  return result_length > 0 ? true : false;
}

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
  return [result, false];
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
  const result = await repository.find();
  return result;
}

export async function login(input) {
  const repository = getRepository(Users);
  const result = await repository.find({
    where: {
      email: input.email,
      password: input.password,
    },
  });
  return result;
}
