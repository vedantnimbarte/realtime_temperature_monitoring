import { Request, Response } from "express";
import { insert } from "../service/temperature.service";

export async function temperatureInsertHandler(req: Request, res: Response) {
  try {
    const result = await insert(req.body);
    return res.status(200);
  } catch (err) {
    return res.status(502).send(err);
  }
}
