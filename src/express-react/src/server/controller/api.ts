import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { UserService } from "../service/index";

@controller("/a")
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  @httpGet("/")
  public getUsers() {
    return "11232";
  }

  @httpGet("/name")
  public getName() {
    const res = this.userService.getUsers();
    return res;
    // return this.userService.hit();
  }
}
