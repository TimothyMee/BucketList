const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
//database connection
connectDB();

app.use(express.json({ extended: false }));
const staticFiles = express.static(path.join(__dirname, "client/build"));
app.use(staticFiles);
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api", require("./api"));

const PORT = 5000;
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server started on port on ${PORT}`);
});
