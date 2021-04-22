import { http } from "./app";
import "./websockets/client";

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});