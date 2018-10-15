"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_express_utils_1 = require("inversify-express-utils");
var express = require("express");
var jwt = require("jsonwebtoken");
var NODE_ENV = process.env.NODE_ENV;
var json;
try {
    json = require(process.cwd() + "/dist/mainfest.json");
}
catch (e) {
    console.log(e);
}
var url = "";
if (!NODE_ENV) {
    url = "http://localhost:9999/dist/bundle.js";
}
else {
    url = "http://assets.dianwoda.cn/tools-dashboard/" + json["main.js"];
}
var IndexController = /** @class */ (function () {
    function IndexController() {
    }
    IndexController.prototype.getIndex = function (req, res) {
        var staff = req.cookies.staff;
        var decoded = jwt.verify(staff, new Buffer("dashboard").toString("base64"));
        return "<!DOCTYPE html>\n    <html lang=\"en\">\n    <head>\n      <meta charset=\"UTF-8\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n      <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n      <link rel=\"shortcut icon\" href=\"http://assets.dianwoda.cn/robert/favicon.ico\" />\n      <title>\u70B9\u6211\u8FBE\u7EDF\u4E00\u63A5\u5165\u5E73\u53F0</title>\n    </head>\n\n    <body>\n      <div id=\"root\">loading...</div>\n      <script>\n      window.__data = {\n        staff: \"" + decoded + "\",\n      }\n      </script>\n      <script src=" + url + "></script>\n    </body>\n\n    </html>\n  ";
    };
    var _a, _b;
    __decorate([
        inversify_express_utils_1.httpGet(""),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_a = typeof express !== "undefined" && express.Request) === "function" ? _a : Object, typeof (_b = typeof express !== "undefined" && express.Response) === "function" ? _b : Object]),
        __metadata("design:returntype", void 0)
    ], IndexController.prototype, "getIndex", null);
    IndexController = __decorate([
        inversify_express_utils_1.controller("/")
    ], IndexController);
    return IndexController;
}());
exports.IndexController = IndexController;
//# sourceMappingURL=index.js.map