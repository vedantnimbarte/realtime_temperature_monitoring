import { Request, Response } from "express";
import log from "../logger";
import {
  insert,
  get,
  getMinTemp,
  getMaxTemp,
  getTempStatus,
  getDataFromDateToDate,
} from "../service/temperature.service";

export async function temperatureInsertHandler(req: Request, res: Response) {
  try {
    await insert(req.body);
    return res.status(200).json({
      success: "1",
      errorMsg: "0",
      temperatureData: [req.body],
    });
  } catch (err) {
    return res.status(502).json({
      success: "0",
      errorMsg: err,
      temperatureData: null,
    });
  }
}

export async function temperatureGetHandler(req: Request, res: Response) {
  try {
    let result = await get(req.body);
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

export async function temperatureGetStatusHandler(req: Request, res: Response) {
  try {
    let result = await getTempStatus(req.body);
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

export async function temperatureMinGetHandler(req: Request, res: Response) {
  try {
    let result = await getMinTemp(req.body);
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

export async function temperatureMaxGetHandler(req: Request, res: Response) {
  try {
    let result = await getMaxTemp(req.body);
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

export async function GenerateReportFromDateToDate(
  req: Request,
  res: Response
) {
  try {
    let result = await getDataFromDateToDate(req.body);
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
