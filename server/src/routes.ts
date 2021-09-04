import { Express, Request, Response } from "express";
import { temperatureInsertHandler } from "./controller/temperature.controller";

export default function (app: Express) {
  app.get("/api/healthcheck", (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  app.post("/api/temperature", temperatureInsertHandler);
}
