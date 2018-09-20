import { UserService } from "../service/index";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsers(): string;
    getName(): string;
}
