import express from "express";
import { mysqlConnection } from "./src/database/connection.js";
import index from "./src/routes/index.js";
import users from "./src/routes/users.js";

(async () => {
  try {
    console.log("Starting the application");

    // Connect to database
    await mysqlConnection();

    const app = express();
    const port = process.env.PORT || 3000;

    app.use(express.json());

    app.use(index);
    app.use(users);

    app.listen(port, () => console.log("Server running on port", port));
  } catch (error) {
    console.log(error);
  }
})();
