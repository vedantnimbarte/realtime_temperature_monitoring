import { Express, Request, Response } from "express";
import {
  temperatureInsertHandler,
  temperatureGetHandler,
  temperatureMinGetHandler,
  temperatureMaxGetHandler,
  temperatureGetStatusHandler,
  GenerateReportFromDateToDate,
} from "./controller/temperature.controller";

export default function (app: Express) {
  app.get("/api/healthcheck", (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  app.post("/api/insertTemp", temperatureInsertHandler);

  app.post("/api/getTemp", temperatureGetHandler);

  app.post("/api/getTempStatus", temperatureGetStatusHandler);

  app.post("/api/getMaxTemp", temperatureMaxGetHandler);

  app.post("/api/getMinTemp", temperatureMinGetHandler);

  app.post("/api/report/fromDateToDate", GenerateReportFromDateToDate);
}
