const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({ origin: "http://localhost:3000" }));
// startup
require("./startup/validation")();
require("./startup/config")();
require("./startup/routes")(app);
require("./startup/db")();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
