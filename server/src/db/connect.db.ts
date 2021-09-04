import "reflect-metadata";
import * as express from "express";
import * as config from "config";
import log from "./logger";
import connect from "./db/connect.db";
import routes from "./routes";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, host, () => {
  log.info(`Server listening at http://${host}:${port}`);
  connect();
  routes(app);
});
