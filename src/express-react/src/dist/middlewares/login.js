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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_express_utils_1 = require("inversify-express-utils");
var express = require("express");
var config = require("config");
var jwt = require("jsonwebtoken");
var axios_1 = require("axios");
var XML = require("xml2js");
var _a = config.get("LOCAL"), CAS = _a.CAS, HOST = _a.HOST;
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.login = function (req, res) {
        res.redirect(CAS + "/login?service=" + HOST + "/auth/cas");
    };
    AuthController.prototype.authCas = function (ticket, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, xml, casData, staff, secret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get(CAS + "/serviceValidate?service=" + HOST + "/auth/cas&ticket=" + ticket)];
                    case 1:
                        data = (_a.sent()).data;
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                XML.parseString(data, function (err, result) {
                                    if (err)
                                        return reject(err);
                                    return resolve(result);
                                });
                            })];
                    case 2:
                        xml = _a.sent();
                        casData = xml["cas:serviceResponse"];
                        if (casData["cas:authenticationFailure"]) {
                            req.body = casData["cas:authenticationFailure"][0].$.code;
                            res.status(401);
                        }
                        else if (casData["cas:authenticationSuccess"]) {
                            staff = casData["cas:authenticationSuccess"][0]["cas:user"][0];
                            console.log(staff, 123123);
                            secret = staff && jwt.sign(staff, new Buffer("dashboard").toString("base64"));
                            res.cookie("staff", secret, {
                                maxAge: 24 * 60 * 60 * 1000,
                                httpOnly: true,
                            });
                            res.redirect("/");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    var _b, _c, _d, _e;
    __decorate([
        inversify_express_utils_1.httpGet("/login"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_b = typeof express !== "undefined" && express.Request) === "function" ? _b : Object, typeof (_c = typeof express !== "undefined" && express.Response) === "function" ? _c : Object]),
        __metadata("design:returntype", void 0)
    ], AuthController.prototype, "login", null);
    __decorate([
        inversify_express_utils_1.httpGet("/cas"),
        __param(0, inversify_express_utils_1.queryParam("ticket")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, typeof (_d = typeof express !== "undefined" && express.Request) === "function" ? _d : Object, typeof (_e = typeof express !== "undefined" && express.Response) === "function" ? _e : Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "authCas", null);
    AuthController = __decorate([
        inversify_express_utils_1.controller("/auth")
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=login.js.map