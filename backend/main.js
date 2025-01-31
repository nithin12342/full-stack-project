const connectDb = require("./config/config");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const cors=require ("cors");

connectDb();

const app = express();
app.use(cors())

app.use(express.json());

app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Server is running in PORT: 3000");
});
