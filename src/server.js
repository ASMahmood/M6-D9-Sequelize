const express = require("express");
const cors = require("cors");

const servicesFolder = require("./services");

const server = express();
const port = process.env.PORT || 8008;

server.use(cors());
server.use(express.json());

server.use("/api", servicesFolder);

server.listen(port, () => {
  console.log("Server is running away from " + port + " kurwas");
});
