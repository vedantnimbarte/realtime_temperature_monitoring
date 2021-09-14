import { Express, Request, Response } from "express";
import {
  temperatureInsertHandler,
  temperatureGetHandler,
  temperatureMinGetHandler,
  temperatureMaxGetHandler,
  temperatureGetStatusHandler,
  GenerateReportFromDateToDate,
  GenerateReportByDate,
  GenerateReportByMonthAndYear,
  allTemperatureGetHandler,
} from "./controller/temperature.controller";
import {
  AddUserHandler,
  getUsersHandler,
  updateUserHandler,
} from "./controller/users.controller";

export default function (app: Express) {
  app.get("/api/healthcheck", (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  app.post("/api/insertTemp", temperatureInsertHandler);

  app.post("/api/getTemp", temperatureGetHandler);

  app.get("/api/getAllTempData", allTemperatureGetHandler);

  app.post("/api/getTempStatus", temperatureGetStatusHandler);

  app.post("/api/getMaxTemp", temperatureMaxGetHandler);

  app.post("/api/getMinTemp", temperatureMinGetHandler);

  app.post("/api/report/byFromDateToDate", GenerateReportFromDateToDate);

  app.post("/api/report/byDate", GenerateReportByDate);

  app.post("/api/report/byMonthAndYear", GenerateReportByMonthAndYear);

  app.get("/api/user/getUsers", getUsersHandler);

  app.post("/api/user/updateUser", updateUserHandler);

  app.post("/api/user/addUser", AddUserHandler);
}
