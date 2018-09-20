import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import * as bodyParser from "body-parser";
// import { UserService } from "./service/index";
import "./controller/index";
// import "./controller/api";

const container = new Container();

// container.bind<UserService>(UserService).to(UserService);

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(bodyParser.json());
});

const serverInstance = server.build();
serverInstance.listen("3000");
console.log("Server started on port 3000 :)");
