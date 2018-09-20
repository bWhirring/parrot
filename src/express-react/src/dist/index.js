"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_express_utils_1 = require("inversify-express-utils");
var inversify_1 = require("inversify");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var config = require("config");
var index_1 = require("./service/index");
require("./controller/index");
require("./controller/api");
require("./middlewares/login");
var intercept_1 = require("./middlewares/intercept");
var PORT = config.get("LOCAL").PORT;
var container = new inversify_1.Container();
container.bind(index_1.UserService).to(index_1.UserService);
var server = new inversify_express_utils_1.InversifyExpressServer(container);
server.setConfig(function (app) {
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(intercept_1.intercept);
    app.use(bodyParser.json());
});
var serverInstance = server.build();
serverInstance.listen(PORT);
console.log("Server started on port " + PORT + " :)");
//# sourceMappingURL=index.js.map