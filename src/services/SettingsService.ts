import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
  chat: boolean,
  username: string
}

class SettingsService {
  constructor() {
  }

  async create({ chat, username }: ISettingsCreate) {
    const settingsRepository = getCustomRepository(SettingsRepository);

    // Validations: if username already exists in the database, throw an error
    const userAlreadyExists = await settingsRepository.findOne({
      username
    });

    if (userAlreadyExists) throw new Error("User already exists!")

    const settings = settingsRepository.create({
      chat,
      username
    })

    await settingsRepository.save(settings);

    return settings;
  }
}

export { SettingsService }