import { controller, httpGet, queryParam } from "inversify-express-utils";
import * as express from "express";
import * as config from "config";
import * as jwt from "jsonwebtoken";
import axios from "axios";

const XML = require("xml2js");

const { CAS, HOST } = config.get("LOCAL");
@controller("/auth")
export class AuthController {
  @httpGet("/login")
  public login(req: express.Request, res: express.Response) {
    res.redirect(`${CAS}/login?service=${HOST}/auth/cas`);
  }

  @httpGet("/cas")
  public async authCas(
  @queryParam("ticket") ticket: string,
    req: express.Request,
    res: express.Response,
  ) {
    const { data } = await axios.get(
      `${CAS}/serviceValidate?service=${HOST}/auth/cas&ticket=${ticket}`,
    );
    const xml = await new Promise((resolve, reject) => {
      XML.parseString(data, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
    const casData = xml["cas:serviceResponse"];
    if (casData["cas:authenticationFailure"]) {
      req.body = casData["cas:authenticationFailure"][0].$.code;
      res.status(401);
    } else if (casData["cas:authenticationSuccess"]) {
      const staff = casData["cas:authenticationSuccess"][0]["cas:user"][0];
      console.log(staff, 123123);
      const secret = staff && jwt.sign(staff, new Buffer("dashboard").toString("base64"));
      res.cookie("staff", secret, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.redirect("/");
    }
  }
}
