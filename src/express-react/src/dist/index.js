"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_express_utils_1 = require("inversify-express-utils");
var inversify_1 = require("inversify");
var bodyParser = require("body-parser");
// import { UserService } from "./service/index";
require("./controller/index");
// import "./controller/api";
var container = new inversify_1.Container();
// container.bind<UserService>(UserService).to(UserService);
var server = new inversify_express_utils_1.InversifyExpressServer(container);
server.setConfig(function (app) {
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(bodyParser.json());
});
var serverInstance = server.build();
serverInstance.listen("3000");
console.log("Server started on port 3000 :)");
//# sourceMappingURL=index.js.map