import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UsersRepository";


class UserService {
  constructor() {
  }

  async create(email: string) {
    const usersRepository = getCustomRepository(UserRepository);

    // Check if user already exists
    const userAlreadyExists = await usersRepository.findOne({
      email
    });

    if (userAlreadyExists) {
      // If it does, return the user object
      return userAlreadyExists;
    }

    // If it does not, save it on db
    const user = usersRepository.create({
      email
    });

    await usersRepository.save(user);

    return user;

  }
}

export { UserService };