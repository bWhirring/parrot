import * as express from "express";
import { UserService } from "../service/index";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getName(): string;
    logout(req: express.Request, res: express.Response): any;
}
