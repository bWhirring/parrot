import { controller, httpGet } from "inversify-express-utils";
import * as express from "express";
import * as jwt from "jsonwebtoken";

const { NODE_ENV } = process.env;

let json;

try {
  json = require(`${process.cwd()}/dist/mainfest.json`);
} catch (e) {
  console.log(e);
}
let url = "";
if (!NODE_ENV) {
  url = `http://localhost:9999/dist/bundle.js`;
} else {
  url = `http://assets.dianwoda.cn/tools-dashboard/${json["main.js"]}`;
}

@controller("/")
export class IndexController {
  @httpGet("")
  public getIndex(req: express.Request, res: express.Response) {
    const { staff } = req.cookies;
    const decoded = jwt.verify(staff, new Buffer("dashboard").toString("base64"));

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="shortcut icon" href="http://assets.dianwoda.cn/robert/favicon.ico" />
      <title>点我达统一接入平台</title>
    </head>

    <body>
      <div id="root">loading...</div>
      <script>
      window.__data = {
        staff: "${decoded}",
      }
      </script>
      <script src=${url}></script>
    </body>

    </html>
  `;
  }
}
