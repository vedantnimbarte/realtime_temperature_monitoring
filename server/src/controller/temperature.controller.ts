import { Request, Response } from "express";
import { insert, get } from "../service/temperature.service";

export async function temperatureInsertHandler(req: Request, res: Response) {
  try {
    await insert(req.body);
    return res.sendStatus(200);
  } catch (err) {
    return res.status(502).send(err);
  }
}

export async function temperatureGetHandler(req: Request, res: Response) {
  try {
    let result = await get(req.body);
    let result_length = Object.keys(result).length;
    if (result_length > 0) {
      return res.status(200).json({ message: result });
    } else {
      return res
        .status(404)
        .json({ message: "No data available with this device id" });
    }
  } catch (err) {
    return res.send(502).send(err);
  }
}
