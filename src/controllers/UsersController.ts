import { Request, Response } from "express";
import { UserService } from "../services/UsersService";

class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const userService = new UserService();

    const user = await userService.create(email);

    return res.json(user);
  }
}

export { UsersController };