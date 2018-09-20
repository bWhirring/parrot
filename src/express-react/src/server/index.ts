import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as config from "config";
import { UserService } from "./service/index";
import "./controller/index";
import "./controller/api";
import "./middlewares/login";

import { intercept } from "./middlewares/intercept";

const { PORT } = config.get("LOCAL");
const container = new Container();

container.bind<UserService>(UserService).to(UserService);

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(cookieParser());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(intercept);
  app.use(bodyParser.json());
});

const serverInstance = server.build();
serverInstance.listen(PORT);
console.log(`Server started on port ${PORT} :)`);
