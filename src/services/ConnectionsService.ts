import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate {
  user_id: string,
  socket_id: string,
  admin_id?: string,
  id?: string
}

class ConnectionsService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({ user_id, socket_id, admin_id, id }: IConnectionCreate) {
    const connection = this.connectionsRepository.create({
      user_id,
      socket_id,
      admin_id,
      id
    });

    await this.connectionsRepository.save(connection);

    return connection;
  }
}

export { ConnectionsService }