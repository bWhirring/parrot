import {
  controller, httpGet, request, response,
} from "inversify-express-utils";
import { inject } from "inversify";
import * as express from "express";

import * as config from "config";
import { UserService } from "../service/index";

const { CAS, HOST } = config.get("LOCAL");

@controller("/api")
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  @httpGet("/")
  @httpGet("/name")
  public getName() {
    const res = this.userService.getUsers();
    return res;
    // return this.userService.hit();
  }

  @httpGet("/logout")
  public async logout(@request() req: express.Request, @response() res: express.Response) {
    res.clearCookie("staff");
    res.send({
      url: `${CAS}/logout?service=${HOST}/auth/login`,
    });
  }
}
