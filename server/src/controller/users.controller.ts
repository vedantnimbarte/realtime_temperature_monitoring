import { Request, Response } from "express";
import log from "../logger";
import {
  addUser,
  getAllUsers,
  login,
  updateUser,
} from "../service/users.service";

export async function AddUserHandler(req: Request, res: Response) {
  try {
    await addUser(req.body);
    return res.status(200).json({
      success: "1",
      errorMsg: "0",
      usersData: [req.body],
    });
  } catch (err) {
    return res.status(502).json({
      success: "0",
      errorMsg: err,
      usersData: null,
    });
  }
}

export async function updateUserHandler(req: Request, res: Response) {
  try {
    await updateUser(req.body);
    return res.status(200).json({
      success: "1",
      errorMsg: "0",
      usersData: [req.body],
    });
  } catch (err) {
    return res.status(502).json({
      success: "0",
      errorMsg: err,
      usersData: null,
    });
  }
}

export async function getUsersHandler(req: Request, res: Response) {
  try {
    let result = await getAllUsers(req.body);
    let result_length = Object.keys(result).length;
    if (result_length > 0) {
      return res.status(200).json({
        success: "1",
        errorMsg: "0",
        usersData: [...result],
      });
    } else {
      return res.status(200).json({
        success: "0",
        errorMsg: "No Data Available",
        usersData: null,
      });
    }
  } catch (err) {
    return res.status(502).json({
      success: "0",
      errorMsg: err,
      usersData: null,
    });
  }
}

export async function loginHandler(req: Request, res: Response) {
  try {
    let result = await login(req.body);
    let result_length = Object.keys(result).length;
    log.info(result);
    if (result_length > 0) {
      return res.status(200).json({
        success: "1",
        errorMsg: "0",
        temperatureData: [...result],
      });
    } else {
      return res.status(200).json({
        success: "0",
        errorMsg: "No Data Available",
        temperatureData: null,
      });
    }
  } catch (err) {
    return res.status(502).json({
      success: "0",
      errorMsg: err,
      temperatureData: null,
    });
  }
}
