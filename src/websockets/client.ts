import { io } from "../app";
import { ConnectionsService } from "../services/ConnectionsService";
import { UserService } from "../services/UsersService";

io.on("connect", (socket) => {
  const connectionsService = new ConnectionsService();
  const userService = new UserService();

  socket.on("client_first_access", async (params) => {
    const socket_id = socket.id;
    const { text, email } = params;
    console.log(params);

    // Verify if the user exists with this email
    const userAlreadyExists = await userService.findByEmail(email);

    let user_id;
    if (!userAlreadyExists) {
      const user = await userService.create(email);
      user_id = user.id;
    } else {
      user_id = userAlreadyExists.id;
    }

    await connectionsService.create({
      socket_id,
      user_id
    })
  })
})