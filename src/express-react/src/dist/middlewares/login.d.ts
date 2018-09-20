import * as express from "express";
export declare class AuthController {
    login(req: express.Request, res: express.Response): void;
    authCas(ticket: string, req: express.Request, res: express.Response): any;
}
