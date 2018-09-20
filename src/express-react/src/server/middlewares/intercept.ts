import * as express from "express";

export async function intercept(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction,
) {
  const { url } = request;
  const { staff } = request.cookies;
  if (url.includes("auth/login") || url.includes("auth/cas")) {
    next();
  } else if (staff) {
    next();
  } else {
    console.log(121);
    response.redirect("/auth/login");
  }
}
