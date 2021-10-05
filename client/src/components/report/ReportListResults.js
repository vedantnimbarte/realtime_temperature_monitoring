import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { headers } from "./CSVHeaders";
import GetApp from "@material-ui/icons/GetApp";
import { CSVLink } from "react-csv";
import { ExportToExcel } from "./ExportExcel";

const ReportListResults = (props, { ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [materialType, setMaterialType] = useState();
  const [filter, setFilter] = useState();
  const [reportData, setReportData] = useState([]);

  const [temperatureData, setTemperatureData] = useState([]);

  let reportDataObject = {
    device_id: "",
    material_type: "",
    min_temp: "",
    max_temp: "",
    temp1: "",
    temp2: "",
    temp_status: "",
    date: "",
    time: "",
  };

  const csvReport = {
    data: reportData,
    headers: headers,
    filename: `${fromDate}_${toDate}_${materialType}_${filter}.csv`,
  };

  const getDataFromApi = async () => {
    setTemperatureData([]);
    let from_date = moment(fromDate).format("DD MMM YYYY");
    let to_date = moment(toDate).format("DD MMM YYYY");
    let reportDataArray = new Array();

    const response = await fetch(
      `http://localhost:8000/api/getAllTempData?material_type=${materialType}&from_date=${from_date}&to_date=${to_date}&filter=${filter}`
    );
    const result = await response.json();
    if (result.success === "1") {
      setTemperatureData(result.temperatureData);
      for (const id in result.temperatureData) {
        console.log(result.temperatureData[id]);
        reportDataObject.device_id = result.temperatureData[id].device_id;
        reportDataObject.material_type =
          result.temperatureData[id].material_type;
        reportDataObject.min_temp = result.temperatureData[id].min_temp;
        reportDataObject.max_temp = result.temperatureData[id].max_temp;
        reportDataObject.temp1 = result.temperatureData[id].temp1;
        reportDataObject.temp2 = result.temperatureData[id].temp2;
        reportDataObject.temp_status =
          result.temperatureData[id].min_temp_status == "1"
            ? "Under Heat"
            : result.temperatureData[id].max_temp_status == "1"
            ? "Over Heat"
            : "Normal";
        reportDataObject.date = result.temperatureData[id].date;
        reportDataObject.time = result.temperatureData[id].time;
        reportDataArray.push(reportDataObject);
        // console.log(reportDataObject);
        reportDataObject = {
          device_id: "",
          material_type: "",
          min_temp: "",
          max_temp: "",
          temp1: "",
          temp2: "",
          temp_status: "",
          date: "",
          time: "",
        };
      }
      setReportData(reportDataArray);
    }
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Box {...props}>
        <Box>
          <Box sx={{ display: reportData.length > 0 ? "block" : "none" }}>
            <CSVLink {...csvReport} style={{ marginLeft: 1, marginRight: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<GetApp />}
              >
                Export to CSV
              </Button>
            </CSVLink>

            <ExportToExcel
              apiData={reportData}
              fileName={`${fromDate}_${toDate}_${materialType}_${filter}`}
            />
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                maxWidth: 500,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography paragraph sx={{ margin: 3 }}>
                From:{" "}
              </Typography>
              <TextField
                fullWidth
                type="date"
                placeholder="From Date"
                variant="standard"
                value={fromDate}
                onChange={(event) => setFromDate(event.target.value)}
              />
            </Box>
            <Box sx={{ maxWidth: 500, display: "flex", alignItems: "center" }}>
              <Typography paragraph sx={{ margin: 3 }}>
                To:{" "}
              </Typography>
              <TextField
                fullWidth
                type="date"
                placeholder="To Date"
                variant="standard"
                value={toDate}
                onChange={(event) => setToDate(event.target.value)}
              />
            </Box>
            <Box sx={{ maxWidth: 500, display: "flex", alignItems: "center" }}>
              <FormControl
                sx={{
                  marginLeft: 3,
                  marginTop: -2,
                  minWidth: 150,
                }}
                variant="standard"
              >
                <InputLabel id="demo-simple-select-label">
                  Choose Material
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={materialType}
                  onChange={(event) => setMaterialType(event.target.value)}
                >
                  <MenuItem value={"Steel Chips"}>Steel Chips</MenuItem>
                  <MenuItem value={"Mill Scale"}>Mill Scale</MenuItem>
                  <MenuItem value={"both"}>Both</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ maxWidth: 500, display: "flex", alignItems: "center" }}>
              <FormControl
                sx={{
                  marginLeft: 3,
                  marginTop: -2,
                  minWidth: 200,
                }}
                variant="standard"
              >
                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filter}
                  onChange={(event) => setFilter(event.target.value)}
                >
                  <MenuItem value={"min"}>Min Temperatures</MenuItem>
                  <MenuItem value={"max"}>Max Temperatures</MenuItem>
                  <MenuItem value={"all"}>All Temperatures</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                sx={{ marginLeft: 2 }}
                onClick={() => getDataFromApi()}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1040 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr No</TableCell>
                  <TableCell>Device Id</TableCell>
                  <TableCell>Material Type</TableCell>
                  <TableCell>Min Temp</TableCell>
                  <TableCell>Max Temp</TableCell>
                  <TableCell>Temperature 1</TableCell>
                  <TableCell>Temperature 2</TableCell>
                  <TableCell>Temp Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {temperatureData.map((data) => (
                  <TableRow hover key={data.id}>
                    <TableCell>{data.sr_no}</TableCell>
                    <TableCell>{data.device_id}</TableCell>
                    <TableCell>{data.material_type}</TableCell>
                    <TableCell>{data.min_temp}</TableCell>
                    <TableCell>{data.max_temp}</TableCell>
                    <TableCell>{data.temp1}</TableCell>
                    <TableCell>{data.temp2}</TableCell>
                    <TableCell
                      sx={{
                        color:
                          data.max_temp_status == "1"
                            ? "red"
                            : data.min_temp_status == "1"
                            ? "orange"
                            : "green",
                      }}
                    >
                      {data.max_temp_status == "1"
                        ? "Overheat"
                        : data.min_temp_status == "1"
                        ? "Under heat"
                        : "Normal"}
                    </TableCell>
                    <TableCell>{data.date}</TableCell>
                    <TableCell>{data.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={temperatureData.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
};

ReportListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};

export default ReportListResults;
