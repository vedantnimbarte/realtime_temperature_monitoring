import { Request, Response } from "express";
import { insert, get } from "../service/temperature.service";

export async function temperatureInsertHandler(req: Request, res: Response) {
  try {
    await insert(req.body);
    return res.status(200).json({
      success: 1,
      errorMsg: 0,
      result: [{ message: "Data inserted successfully" }],
    });
  } catch (err) {
    return res.status(502).json({
      success: 0,
      errorMsg: 1,
      result: [{ message: err }],
    });
  }
}

export async function temperatureGetHandler(req: Request, res: Response) {
  try {
    let result = await get(req.body);
    let result_length = Object.keys(result).length;
    if (result_length > 0) {
      return res.status(200).json({
        success: 1,
        errorMsg: 0,
        result: [{ ...result }],
      });
    } else {
      return res.status(404).json({
        success: 1,
        errorMsg: 0,
        result: [{ message: "No device data available with this id" }],
      });
    }
  } catch (err) {
    return res.send(502).send(err);
  }
}
