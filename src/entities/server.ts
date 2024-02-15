import express from "express";
import morgan from "morgan";
import Cookie from "cookie-parser";
export interface User {
  id: string;
  username: string;
  password?: string;
}

class Server {
  private port: number;
  private app: any;
  constructor(port: number) {
    this.port = port;
    this.app = express();
  }

  public start() {
    const App = express();
    App.use(express.json());
    App.use(Cookie());
    App.use(morgan("dev"));
    App.use("/api", require("../router/signup.router"));
    App.use("/api", require("../router/login.router"));
    App.use("/api", require("../router/logout.router"));
    App.use("/api", require("../router/modify.router"));
    App.use("/api", require("../router/getUsers.router"));
    App.use("", (req, res) => res.send("Welcome to the server!"));
    App.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default Server;
