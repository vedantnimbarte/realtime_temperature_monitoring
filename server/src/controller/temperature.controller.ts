import { Request, Response } from "express";
import log from "../logger";
import {
  insert,
  get,
  getMinTemp,
  getMaxTemp,
  getTempStatus,
  getDataFromDateToDate,
  getDataByDate,
  getDataByMonthAndYear,
  getAllData,
  getLiveData,
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
      temperatureData: [],
    });
  }
}

export async function temperatureGetHandler(req: Request, res: Response) {
  try {
    let result = await get(req.body);
    let result_length = Object.keys(result).length;
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
        temperatureData: [],
      });
    }
  } catch (err) {
    return res.status(502).json({
      success: "0",
      errorMsg: err,
      temperatureData: [],
    });
  }
}

export async function allTemperatureGetHandler(req: Request, res: Response) {
  try {
    let result = await getAllData(req.query);
    let result_length = Object.keys(result).length;
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
        temperatureData: [],
      });
    }
  } catch (err) {
    return res.status(502).json({
      success: "0",
      errorMsg: err,
      temperatureData: [],
    });
  }
}

export async function temperatureGetStatusHandler(req: Request, res: Response) {
  try {
    let result = await getTempStatus(req.body);
    let result_length = Object.keys(result).length;
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
        temperatureData: [],
      });
    }
  } catch (err) {
    return res.status(502).json({
      success: "0",
      errorMsg: err,
      temperatureData: [],
    });
  }
}

export async function temperatureMinGetHandler(req: Request, res: Response) {
  try {
    let result = await getMinTemp(req.body);
    let result_length = Object.keys(result).length;
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
        temperatureData: [],
      });
    }
  } catch (err) {
    return res.status(502).json({
      success: "0",
      errorMsg: err,
      temperatureData: [],
    });
  }
}

export async function temperatureMaxGetHandler(req: Request, res: Response) {
  try {
    let result = await getMaxTemp(req.body);
    let result_length = Object.keys(result).length;
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
        temperatureData: [],
      });
    }
  } catch (err) {
    return res.status(502).json({
      success: "0",
      errorMsg: err,
      temperatureData: [],
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
        temperatureData: [],
      });
    }
  } catch (err) {
    return res.status(502).json({
      success: "0",
      errorMsg: err,
      temperatureData: [],
    });
  }
}

export async function GenerateReportByDate(req: Request, res: Response) {
  try {
    let result = await getDataByDate(req.body);
    let result_length = Object.keys(result).length;
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
        temperatureData: [],
      });
    }
  } catch (err) {
    return res.status(502).json({
      success: "0",
      errorMsg: err,
      temperatureData: [],
    });
  }
}

export async function GenerateReportByMonthAndYear(
  req: Request,
  res: Response
) {
  try {
    let result = await getDataByMonthAndYear(req.body);
    let result_length = Object.keys(result).length;
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
        temperatureData: [],
      });
    }
  } catch (err) {
    return res.status(502).json({
      success: "0",
      errorMsg: err,
      temperatureData: [],
    });
  }
}

export async function LiveDataHandler(req: Request, res: Response) {
  try {
    let result = await getLiveData();
    if (result !== null) {
      let result_length = Object.keys(result).length;
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
          temperatureData: [],
        });
      }
    } else {
      return res.status(200).json({
        success: "0",
        errorMsg: "No Data Available",
        temperatureData: [],
      });
    }
  } catch (err) {
    return res.status(502).json({
      success: "0",
      errorMsg: err,
      temperatureData: [],
    });
  }
}
