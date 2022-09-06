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

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`app listening at port ${port}`));
