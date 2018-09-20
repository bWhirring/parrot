import { UserService } from "../service/user";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsers(): string;
    getName(): any;
}
