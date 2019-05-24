import { Container } from "inversify";
import TYPES from "./constant/types";
import { UserService } from "./service/user";

let containter = new Container();
containter.bind<UserService>(TYPES.UserService).to(UserService);
let test = containter.resolve(UserService);
console.log(test, 1111111);

export default containter;
