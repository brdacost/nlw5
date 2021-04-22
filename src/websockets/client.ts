import { io } from "../app";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";
import { UserService } from "../services/UsersService";

interface IParams {
  text: string;
  email: string;
}

io.on("connect", (socket) => {
  const connectionsService = new ConnectionsService();
  const userService = new UserService();
  const messagesService = new MessagesService();

  socket.on("client_first_access", async (params) => {
    let socket_id = socket.id;
    const { text, email } = params as IParams;
    console.log(params);

    // Verify if the user exists with this email
    const userAlreadyExists = await userService.findByEmail(email);

    let user_id, existingConnectionParams = {};
    if (!userAlreadyExists) {
      const user = await userService.create(email);
      user_id = user.id;
    } else {
      user_id = userAlreadyExists.id;
      const connection = await connectionsService.findByUserId(user_id);
      if (connection) {
        socket_id = connection.socket_id;
        existingConnectionParams = connection;
      }
    }

    await connectionsService.create({
      socket_id,
      user_id,
      ...existingConnectionParams
    })

    await messagesService.create({
      text,
      user_id
    })
  })
})