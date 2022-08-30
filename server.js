const app = require("./app");
const http = require("http");

const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connection successful"));

const server = http.createServer(app);

const PORT = 8000;
server.listen(PORT, () => console.log(`app listening at port ${PORT}`));
