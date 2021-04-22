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

  async create({ user_id, socket_id, admin_id, id }: IConnectionCreate): Promise<Connection> {
    const connection = this.connectionsRepository.create({
      user_id,
      socket_id,
      admin_id,
      id
    });

    await this.connectionsRepository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string): Promise<Connection> {
    const connection = await this.connectionsRepository.findOne({
      user_id
    });

    return connection;
  }
}

export { ConnectionsService }