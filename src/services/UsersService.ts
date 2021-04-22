import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UsersRepository";


class UserService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UserRepository);
  }

  async create(email: string) {

    // Check if user already exists
    const userAlreadyExists = await this.usersRepository.findOne({
      email
    });

    if (userAlreadyExists) {
      // If it does, return the user object
      return userAlreadyExists;
    }

    // If it does not, save it on db
    const user = this.usersRepository.create({
      email
    });

    await this.usersRepository.save(user);

    return user;

  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      email
    });

    return user;
  }
}

export { UserService };