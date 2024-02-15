import "./config/dotenv";
import Server from "./entities/server";

const server = new Server(3000);

server.start();
